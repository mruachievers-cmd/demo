import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Hospital, Shield, ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface LocationData {
  lat: number;
  lng: number;
}

const nearbyPlaces = [
  { name: "City Police Station", type: "Police", distance: "0.8 km", icon: Shield },
  { name: "Metro Hospital", type: "Hospital", distance: "1.2 km", icon: Hospital },
  { name: "Women's Help Center", type: "Safe Zone", distance: "1.5 km", icon: MapPin },
  { name: "Central Police HQ", type: "Police", distance: "2.1 km", icon: Shield },
];

export default function Tracking() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [tracking, setTracking] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const startTracking = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      toast({ title: "Not supported", description: "Geolocation is not available", variant: "destructive" });
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setTracking(true);
        setLoading(false);
        toast({ title: "📍 Tracking Active", description: "Your location is being shared" });
      },
      () => {
        setLoading(false);
        toast({ title: "Permission denied", description: "Enable location access", variant: "destructive" });
      }
    );
  };

  useEffect(() => {
    if (!tracking) return;
    const id = navigator.geolocation.watchPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      undefined,
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(id);
  }, [tracking]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto px-5 pt-4">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate("/")} className="p-2 -ml-2 rounded-xl hover:bg-secondary transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Live Tracking</h1>
        </div>

        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-card rounded-2xl border border-border overflow-hidden mb-6"
          style={{ height: 240 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
            {location ? (
              <div className="text-center">
                <div className="relative">
                  <div className="w-4 h-4 rounded-full bg-emergency mx-auto animate-ping absolute inset-0 m-auto" />
                  <Navigation className="w-8 h-8 text-emergency mx-auto relative z-10" />
                </div>
                <p className="text-xs text-muted-foreground mt-3 font-mono">
                  {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                </p>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <MapPin className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">Enable tracking to see your location</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Tracking Button */}
        <Button
          onClick={() => tracking ? (setTracking(false), toast({ title: "Tracking stopped" })) : startTracking()}
          disabled={loading}
          className={`w-full h-12 rounded-2xl font-semibold ${
            tracking
              ? "bg-safe hover:bg-safe/90 text-safe-foreground"
              : "bg-emergency hover:bg-emergency/90 text-emergency-foreground"
          }`}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : null}
          {tracking ? "Stop Sharing Location" : "Start Live Tracking"}
        </Button>

        {/* Nearby Help */}
        <h3 className="text-sm font-semibold mt-8 mb-3 text-muted-foreground uppercase tracking-wider">Nearby Help</h3>
        <div className="space-y-3">
          {nearbyPlaces.map((place, i) => (
            <motion.div
              key={place.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="bg-card rounded-2xl p-4 border border-border flex items-center gap-3"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                place.type === "Police" ? "bg-emergency/10 text-emergency" :
                place.type === "Hospital" ? "bg-safe/10 text-safe" :
                "bg-warning/10 text-warning"
              }`}>
                <place.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{place.name}</p>
                <p className="text-xs text-muted-foreground">{place.type} • {place.distance}</p>
              </div>
              <Navigation className="w-4 h-4 text-muted-foreground" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
