import { Home, Users, MapPin, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const tabs = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/contacts", icon: Users, label: "Contacts" },
  { path: "/tracking", icon: MapPin, label: "Track" },
  { path: "/settings", icon: Settings, label: "Settings" },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-white/10 shadow-2xl pb-safe">
      <div className="flex justify-around items-center h-20 max-w-lg mx-auto px-4">
        {tabs.map((tab) => {
          const active = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="relative flex flex-col items-center gap-1.5 py-1 px-4 group transition-all"
            >
              {active && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-1 w-10 h-1.5 rounded-full bg-primary shadow-[0_0_15px_hsla(var(--primary),0.5)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <tab.icon
                className={`w-6 h-6 transition-all duration-300 ${
                  active ? "text-primary scale-110" : "text-muted-foreground group-hover:text-foreground"
                }`}
              />
              <span
                className={`text-[10px] font-bold tracking-tight transition-all duration-300 ${
                  active ? "text-foreground" : "text-muted-foreground opacity-60"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

