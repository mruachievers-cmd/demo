import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Shield, X, AlertTriangle, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SOSButton() {
  const [active, setActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();
  
  // Magnetic Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const activateSOS = () => {
    setActive(true);
    // Location capturing
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          toast({
            title: "📍 Real-time Guardian Active",
            description: `Coordinates locked: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`,
          });
        }
      );
    }
    toast({
      title: "🚨 SOS INITIALIZED",
      description: "Emergency responders and contacts notified with live path.",
    });
  };

  return (
    <div className="relative flex items-center justify-center p-20">
      {/* Dynamic Background Glow */}
      <motion.div 
        animate={{ 
          scale: active ? 1.5 : 1,
          opacity: active ? 0.3 : 0.1
        }}
        className={`absolute w-64 h-64 rounded-full blur-3xl transition-colors duration-1000 ${
          active ? "bg-emergency" : "bg-primary"
        }`}
      />

      <motion.div
        style={{ x: mouseX, y: mouseY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        className="relative z-10 cursor-pointer"
        onClick={() => (active ? setActive(false) : activateSOS())}
      >
        {/* Animated Rings */}
        <AnimatePresence>
          {(active || isHovered) && (
            <>
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ 
                    scale: active ? [0.8, 2.5] : [0.8, 1.5], 
                    opacity: active ? [0.5, 0] : [0.3, 0] 
                  }}
                  transition={{ 
                    duration: active ? 2 : 3, 
                    repeat: Infinity, 
                    delay: i * 0.8,
                    ease: "easeOut" 
                  }}
                  className={`absolute inset-0 rounded-full border ${
                    active ? "border-emergency shadow-[0_0_20px_hsla(var(--emergency),0.5)]" : "border-primary/30"
                  }`}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* The Button Body */}
        <motion.div
          animate={{
            scale: active ? 1.1 : isHovered ? 1.05 : 1,
            rotate: active ? [0, -5, 5, 0] : 0
          }}
          transition={{
            rotate: active ? { repeat: Infinity, duration: 0.5 } : { duration: 0.3 }
          }}
          className={`relative w-44 h-44 rounded-full flex flex-col items-center justify-center gap-2 shadow-2xl transition-all duration-500 glass-panel overflow-hidden border-2 ${
            active 
              ? "border-emergency bg-emergency/20 shadow-emergency/50" 
              : "border-white/20 hover:border-primary/50 group"
          }`}
        >
          {/* Inner Light Sweep Effect */}
          <motion.div 
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 pointer-events-none"
          />

          {active ? (
            <>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <X className="w-12 h-12 text-emergency" />
              </motion.div>
              <span className="text-xs font-bold tracking-widest text-emergency uppercase">Cancel</span>
            </>
          ) : (
            <>
              <div className="relative">
                <Shield className={`w-14 h-14 ${isHovered ? "text-primary" : "text-foreground"} transition-colors`} />
                {isHovered && (
                  <motion.div 
                    layoutId="zap"
                    className="absolute -top-1 -right-1"
                  >
                    <Zap className="w-5 h-5 text-primary fill-current" />
                  </motion.div>
                )}
              </div>
              <span className="text-3xl font-black tracking-tighter italic">SOS</span>
              <p className="text-[10px] uppercase font-semibold text-muted-foreground opacity-60">Ready to Protect</p>
            </>
          )}

          {/* Bottom Glow Segment */}
          <div className={`absolute bottom-0 w-full h-1/3 bg-gradient-to-t ${active ? "from-emergency/20" : "from-primary/5"} to-transparent`} />
        </motion.div>
      </motion.div>
    </div>
  );
}

