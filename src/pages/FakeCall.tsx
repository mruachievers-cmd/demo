import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, PhoneOff, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FakeCall() {
  const [answered, setAnswered] = useState(false);
  const [callTime, setCallTime] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!answered) return;
    const timer = setInterval(() => setCallTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, [answered]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        {/* Caller Avatar */}
        <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
          <UserCircle className="w-16 h-16 text-muted-foreground" />
        </div>

        <h2 className="text-2xl font-bold mb-1">Mom</h2>
        <p className="text-muted-foreground text-sm mb-8">
          {answered ? formatTime(callTime) : "Incoming call..."}
        </p>

        {/* Call Buttons */}
        <div className="flex items-center justify-center gap-8">
          {!answered && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setAnswered(true)}
              className="w-16 h-16 rounded-full bg-safe flex items-center justify-center shadow-lg"
            >
              <Phone className="w-7 h-7 text-safe-foreground" />
            </motion.button>
          )}

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/")}
            className="w-16 h-16 rounded-full bg-emergency flex items-center justify-center shadow-lg"
          >
            <PhoneOff className="w-7 h-7 text-emergency-foreground" />
          </motion.button>
        </div>

        {!answered && (
          <p className="text-xs text-muted-foreground mt-8">This is a fake call to help you leave</p>
        )}
      </motion.div>
    </div>
  );
}
