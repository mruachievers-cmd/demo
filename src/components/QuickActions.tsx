import { motion } from "framer-motion";
import { Phone, MessageSquare, Siren, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    icon: Siren,
    label: "Fake Call",
    description: "Discrete escape",
    route: "/fake-call",
    color: "bg-primary/10 text-primary",
    delay: 0,
  },
  {
    icon: Phone,
    label: "Emergency",
    description: "Direct dial",
    route: "/",
    color: "bg-emergency/10 text-emergency",
    delay: 0.1,
  },
  {
    icon: MessageSquare,
    label: "Quick SMS",
    description: "Batch alert",
    route: "/",
    color: "bg-safe/10 text-safe",
    delay: 0.2,
  },
  {
    icon: UserPlus,
    label: "Add Guard",
    description: "New contact",
    route: "/contacts",
    color: "bg-warning/10 text-warning",
    delay: 0.3,
  },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <motion.button
          key={action.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: action.delay }}
          whileHover={{ y: -5, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(action.route)}
          className="premium-card p-5 flex flex-col items-center text-center group"
        >
          <div className={`w-12 h-12 rounded-2xl ${action.color} flex items-center justify-center mb-3 transition-transform group-hover:rotate-12`}>
            <action.icon className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold">{action.label}</p>
          <p className="text-[10px] text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {action.description}
          </p>
        </motion.button>
      ))}
    </div>
  );
}
