import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export default function Tilt({ children, className = "", intensity = 15 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]);

  const glareX = useTransform(mouseX, [-0.5, 0.5], [-100, 100]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], [-100, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative position -0.5 to 0.5
    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        perspective: "1000px",
      }}
      className={`relative z-10 transition-shadow duration-300 ${isHovered ? "z-20" : ""} ${className}`}
    >
      <div 
        style={{ 
          transform: "translateZ(50px)", 
          transformStyle: "preserve-3d" 
        }}
        className="relative z-10 h-full w-full"
      >
        {children}
      </div>
      
      {/* Glare effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            style={{
              background: "radial-gradient(circle at center, white 0%, transparent 80%)",
              x: glareX,
              y: glareY,
            }}
            className="absolute inset-0 pointer-events-none z-20 rounded-[inherit]"
          />
        )}
      </AnimatePresence>

    </motion.div>
  );
}
