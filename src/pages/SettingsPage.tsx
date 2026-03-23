import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Moon, Sun, Bell, Shield, Volume2, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  const [notifications, setNotifications] = useState(true);
  const [alarmSound, setAlarmSound] = useState(true);
  const [autoRecord, setAutoRecord] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const settings = [
    { icon: dark ? Moon : Sun, label: "Dark Mode", description: "Reduce eye strain", value: dark, onChange: setDark },
    { icon: Bell, label: "Notifications", description: "Receive safety alerts", value: notifications, onChange: setNotifications },
    { icon: Volume2, label: "Alarm Sound", description: "Play siren on SOS", value: alarmSound, onChange: setAlarmSound },
    { icon: Smartphone, label: "Auto Record", description: "Record on SOS activation", value: autoRecord, onChange: setAutoRecord },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto px-5 pt-4">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate("/")} className="p-2 -ml-2 rounded-xl hover:bg-secondary transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Settings</h1>
        </div>

        <div className="space-y-3">
          {settings.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="bg-card rounded-2xl p-4 border border-border flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <s.icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{s.label}</p>
                <p className="text-xs text-muted-foreground">{s.description}</p>
              </div>
              <Switch checked={s.value} onCheckedChange={s.onChange} />
            </motion.div>
          ))}
        </div>

        {/* About */}
        <div className="mt-8 text-center">
          <Shield className="w-8 h-8 text-emergency mx-auto mb-2" />
          <p className="text-sm font-semibold">ShieldHer</p>
          <p className="text-xs text-muted-foreground">v1.0 • Your safety companion</p>
        </div>
      </div>
    </div>
  );
}
