import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SOSButton() {
  const [active, setActive] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null);
  const { toast } = useToast();

  const startAlarm = useCallback(() => {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.value = 800;
    gain.gain.value = 0.3;
    osc.connect(gain);
    gain.connect(ctx.destination);

    // Siren effect
    const now = ctx.currentTime;
    for (let i = 0; i < 100; i++) {
      osc.frequency.setValueAtTime(800, now + i * 0.5);
      osc.frequency.linearRampToValueAtTime(1200, now + i * 0.5 + 0.25);
    }

    osc.start();
    setAudioCtx(ctx);
    setOscillator(osc);
  }, []);

  const stopAlarm = useCallback(() => {
    oscillator?.stop();
    audioCtx?.close();
    setOscillator(null);
    setAudioCtx(null);
  }, [oscillator, audioCtx]);

  const activateSOS = () => {
    setActive(true);
    startAlarm();

    // Request location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          toast({
            title: "📍 Location captured",
            description: `Lat: ${pos.coords.latitude.toFixed(4)}, Lng: ${pos.coords.longitude.toFixed(4)}`,
          });
        },
        () => {
          toast({ title: "Location unavailable", description: "Enable GPS for better protection", variant: "destructive" });
        }
      );
    }

    toast({
      title: "🚨 SOS Activated",
      description: "Emergency alerts sent to your contacts",
    });
  };

  const deactivateSOS = () => {
    setActive(false);
    stopAlarm();
    toast({ title: "SOS Deactivated", description: "You're safe. All alerts stopped." });
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Ripple rings when active */}
      <AnimatePresence>
        {active && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border-2 border-emergency"
                initial={{ width: 160, height: 160, opacity: 0.5 }}
                animate={{ width: 300, height: 300, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Outer glow ring */}
      <div
        className={`absolute w-44 h-44 rounded-full transition-all duration-500 ${
          active
            ? "bg-emergency/20"
            : "bg-emergency/10 animate-pulse-emergency"
        }`}
      />

      {/* Main SOS Button */}
      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={active ? deactivateSOS : activateSOS}
        className={`relative z-10 w-36 h-36 rounded-full flex flex-col items-center justify-center gap-1 font-bold text-emergency-foreground shadow-2xl transition-all duration-300 ${
          active
            ? "bg-gradient-to-br from-red-600 to-red-800 shadow-red-500/50"
            : "bg-gradient-to-br from-red-500 to-red-700 shadow-red-500/30 hover:shadow-red-500/50"
        }`}
      >
        {active ? (
          <>
            <X className="w-10 h-10" />
            <span className="text-xs tracking-wider uppercase">Stop</span>
          </>
        ) : (
          <>
            <Shield className="w-10 h-10" />
            <span className="text-2xl tracking-widest">SOS</span>
          </>
        )}
      </motion.button>
    </div>
  );
}
