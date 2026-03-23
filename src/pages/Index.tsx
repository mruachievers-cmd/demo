import SOSButton from "@/components/SOSButton";
import QuickActions from "@/components/QuickActions";
import Tilt from "@/components/Tilt";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Users, Shield, ArrowRight, Zap, BellRing, ChevronRight } from "lucide-react";
import { getContacts } from "@/lib/storage";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export default function Index() {
  const contacts = getContacts();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-24 pt-16" ref={containerRef}>
      {/* Background Layered Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-mesh opacity-30" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-[10%] -left-20 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px]"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute top-[40%] -right-20 w-[300px] h-[300px] bg-accent/20 rounded-full blur-[100px]"
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 space-y-12">
        {/* Dynamic Hero Section */}
        <section className="relative pt-8 pb-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Security Protocol: Active
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-4 leading-[1.1]">
              Intelligent Guard <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x bg-[length:200%_auto]">
                At Your Fingertips
              </span>
            </h1>
            
            <p className="max-w-lg mx-auto text-base text-muted-foreground/80 leading-relaxed">
              Experience the pinnacle of personal safety. ShieldHer combines real-time tracking with one-tap emergency response for absolute confidence.
            </p>
          </motion.div>

          <div className="mt-8 flex flex-col items-center">
            <SOSButton />
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 flex items-center gap-2 px-4 py-2 rounded-2xl bg-secondary/50 backdrop-blur-md text-xs font-semibold text-muted-foreground border border-white/5"
            >
              <BellRing className="w-4 h-4 text-primary" />
              Monitoring active for {contacts.length} responders
            </motion.div>
          </div>
        </section>

        {/* Status Hub */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <Tilt className="md:col-span-8 h-full">
            <div className="premium-card p-6 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-br from-white/5 to-primary/5 h-full">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-safe/10 flex items-center justify-center">
                    <Shield className="w-7 h-7 text-safe" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-safe rounded-full border-2 border-background animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Safe Haven Online</h3>
                  <p className="text-xs text-muted-foreground">Location sync enabled • Satellite Lock: 98%</p>
                </div>
              </div>
              <button className="magnetic-button text-xs font-bold uppercase tracking-widest bg-foreground text-background dark:bg-primary dark:text-white px-6 py-3 rounded-xl transition-all hover:shadow-[0_0_20px_hsla(var(--primary),0.3)]">
                Sync Stats
              </button>
            </div>
          </Tilt>

          <Tilt className="md:col-span-4 h-full">
            <div className="premium-card p-6 bg-gradient-to-br from-warning/5 to-transparent flex flex-col justify-center h-full">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-4 h-4 text-warning" />
                <span className="text-xs font-bold uppercase tracking-tighter">Current Zone</span>
              </div>
              <p className="text-lg font-black font-mono">NEIGHBORHOOD 04</p>
              <p className="text-[10px] text-muted-foreground mt-1">Status: Regular/Safe Area</p>
            </div>
          </Tilt>
        </div>

        {/* Quick Access Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight">Active Defense</h2>
              <p className="text-xs text-muted-foreground italic">Instant tools for every scenario</p>
            </div>
            <button className="group flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-primary/80 hover:text-primary transition-colors">
              Explore Tools <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          
          <QuickActions />
        </section>

        {/* Feature Triggers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Tilt>
            <motion.button
              onClick={() => navigate("/tracking")}
              className="premium-card p-8 group text-left h-full border-white/5"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 tracking-tight">Path Guardian</h3>
              <p className="text-sm text-muted-foreground/80 leading-relaxed mb-4">
                High-precision tracking which alerts your circle if you deviate from your predicted route.
              </p>
              <div className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1">
                Configure Path <ChevronRight className="w-3 h-3" />
              </div>
            </motion.button>
          </Tilt>

          <Tilt>
            <motion.button
              onClick={() => navigate("/contacts")}
              className="premium-card p-8 group text-left h-full border-white/5"
            >
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3 tracking-tight">Rapid Circle</h3>
              <p className="text-sm text-muted-foreground/80 leading-relaxed mb-4">
                A dedicated list of {contacts.length} guardians with direct bypass of Do-Not-Disturb protocols.
              </p>
              <div className="text-[10px] font-black uppercase tracking-widest text-accent flex items-center gap-1">
                Manage List <ChevronRight className="w-3 h-3" />
              </div>
            </motion.button>
          </Tilt>
        </div>
      </div>
    </div>
  );
}


