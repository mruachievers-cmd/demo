import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, Bell, Shield, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative flex items-center justify-between rounded-full px-6 py-2 transition-all duration-500 glass-panel ${
            isScrolled ? "shadow-lg shadow-black/5" : ""
          }`}
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-primary/20 p-2 rounded-xl">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">
              Shield<span className="text-primary">Her</span>
            </span>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-4">
            <AnimatePresence>
              {isSearchOpen ? (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="relative overflow-hidden"
                >
                  <input
                    type="text"
                    placeholder="Search features..."
                    autoFocus
                    className="w-full bg-secondary/50 border-none rounded-full px-4 py-1.5 text-sm focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                  <X 
                    className="absolute right-3 top-2 w-4 h-4 text-muted-foreground cursor-pointer"
                    onClick={() => setIsSearchOpen(false)}
                  />
                </motion.div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 hover:bg-secondary rounded-full transition-colors"
                >
                  <Search className="w-5 h-5 text-muted-foreground" />
                </motion.button>
              )}
            </AnimatePresence>

            <div className="h-6 w-px bg-border mx-1 hidden sm:block" />

            <button className="relative p-2 hover:bg-secondary rounded-full transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-emergency rounded-full border-2 border-background" />
            </button>

            <button className="sm:hidden p-2 hover:bg-secondary rounded-full transition-colors">
              <Menu className="w-5 h-5" />
            </button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 rounded-full font-medium text-sm transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              Get Pro
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
}
