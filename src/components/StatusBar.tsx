import { Shield, Battery, Wifi } from "lucide-react";

export default function StatusBar() {
  return (
    <div className="flex items-center justify-between px-1 py-3">
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-emergency" />
        <span className="text-lg font-bold tracking-tight">ShieldHer</span>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Wifi className="w-4 h-4" />
        <Battery className="w-4 h-4" />
      </div>
    </div>
  );
}
