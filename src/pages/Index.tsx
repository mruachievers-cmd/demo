import SOSButton from "@/components/SOSButton";
import QuickActions from "@/components/QuickActions";
import StatusBar from "@/components/StatusBar";
import { motion } from "framer-motion";
import { MapPin, Users } from "lucide-react";
import { getContacts } from "@/lib/storage";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const contacts = getContacts();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto px-5">
        <StatusBar />

        {/* Safety Status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 bg-card rounded-2xl p-4 border border-border"
        >
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-safe animate-pulse" />
            <div>
              <p className="text-sm font-semibold">You're Safe</p>
              <p className="text-xs text-muted-foreground">All systems active • Location ready</p>
            </div>
          </div>
        </motion.div>

        {/* SOS Button */}
        <div className="flex items-center justify-center py-10">
          <SOSButton />
        </div>

        <p className="text-center text-xs text-muted-foreground mb-8 -mt-2">
          Press & hold for emergency. Alerts sent to {contacts.length} contact{contacts.length !== 1 ? "s" : ""}.
        </p>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Quick Actions</h3>
          <QuickActions />
        </motion.div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => navigate("/tracking")}
            className="bg-card rounded-2xl p-4 border border-border text-left"
          >
            <MapPin className="w-5 h-5 text-warning mb-2" />
            <p className="text-sm font-semibold">Live Location</p>
            <p className="text-[11px] text-muted-foreground mt-1">Share with trusted contacts</p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            onClick={() => navigate("/contacts")}
            className="bg-card rounded-2xl p-4 border border-border text-left"
          >
            <Users className="w-5 h-5 text-safe mb-2" />
            <p className="text-sm font-semibold">Contacts</p>
            <p className="text-[11px] text-muted-foreground mt-1">{contacts.length} emergency contacts</p>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
