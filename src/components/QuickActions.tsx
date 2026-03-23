import { Phone, MapPin, Mic, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const actions = [
  {
    icon: Phone,
    label: "Fake Call",
    color: "bg-safe text-safe-foreground",
    action: "fake-call",
  },
  {
    icon: MapPin,
    label: "Nearby Help",
    color: "bg-warning text-warning-foreground",
    action: "tracking",
  },
  {
    icon: Mic,
    label: "Voice SOS",
    color: "bg-secondary text-secondary-foreground",
    action: "voice",
  },
  {
    icon: Video,
    label: "Record",
    color: "bg-secondary text-secondary-foreground",
    action: "record",
  },
];

export default function QuickActions() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAction = (action: string) => {
    switch (action) {
      case "fake-call":
        navigate("/fake-call");
        break;
      case "tracking":
        navigate("/tracking");
        break;
      case "voice":
        toast({ title: "🎙️ Voice SOS", description: "Say 'Help me' to activate SOS. (Demo mode)" });
        break;
      case "record":
        toast({ title: "📹 Recording", description: "Evidence capture started. (Demo mode)" });
        break;
    }
  };

  return (
    <div className="grid grid-cols-4 gap-3">
      {actions.map((a, i) => (
        <motion.button
          key={a.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * i }}
          onClick={() => handleAction(a.action)}
          className="flex flex-col items-center gap-2"
        >
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${a.color} shadow-lg`}>
            <a.icon className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-medium text-muted-foreground">{a.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
