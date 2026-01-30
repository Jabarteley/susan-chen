import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { MapPin, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, 40);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span>
      {displayText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-0.5 h-[1em] bg-gold ml-1 align-middle"
        />
      )}
    </span>
  );
};

const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  } as const;

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden">
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, hsl(38 80% 55% / 0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, hsl(38 80% 55% / 0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 80%, hsl(38 80% 55% / 0.08) 0%, transparent 50%)"
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-gold/30"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`
          }}
          animate={{
            y: [-30, 30, -30],
            x: [-20, 20, -20],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
        />
      ))}

      {/* Decorative grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--charcoal)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--charcoal)) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Main content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="container mx-auto px-6 lg:px-12 py-20 lg:py-32 relative z-10"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row items-center gap-12 max-w-6xl"
        >
          {/* Text Content */}
          <div className="flex-1">
            {/* Eyebrow with animated line */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="h-px w-16 bg-gold origin-left"
              />
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">
                Managing Director • Investor • Founder
              </span>
            </motion.div>

            {/* Main Headline with reveal effect */}
            <motion.div variants={itemVariants} className="overflow-hidden mb-4">
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="font-display text-5xl md:text-6xl lg:text-8xl font-medium text-charcoal"
              >
                Susan Chen
              </motion.h1>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <p className="font-display text-2xl md:text-3xl lg:text-4xl text-charcoal-light leading-snug">
                <TypewriterText text="Global Investor, Founder, " delay={1200} />
                <span className="text-gradient-gold italic">
                  <TypewriterText text="Operator" delay={2400} />
                </span>
                <TypewriterText text=" & Mentor" delay={2800} />
              </p>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground font-light mb-10 max-w-2xl"
            >
              Scaling Tech & Investment Across Emerging Markets
            </motion.p>

            {/* Animated description with highlight */}
            <motion.div variants={itemVariants} className="relative mb-8 max-w-2xl">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 4 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="absolute left-0 top-0 bottom-0 bg-gold rounded-full"
              />
              <p className="text-lg text-foreground/80 leading-relaxed pl-6">
                Susan Chen is a Managing Director at a growth-stage investment fund focused on emerging markets.
                A founder, angel investor, operator, and mentor, she partners with visionary entrepreneurs to build
                real, scalable businesses that redefine what's possible beyond traditional tech hubs.
              </p>
            </motion.div>

            {/* Location badge with map pulse */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 mb-10"
            >
              <div className="relative">
                <MapPin className="w-5 h-5 text-gold relative z-10" />
                <motion.div
                  animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-gold/30 rounded-full"
                />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                Experience across Sub-Saharan Africa, Southeast Asia, Latin America & global ecosystems
              </span>
            </motion.div>

            {/* CTA with magnetic effect */}
            <motion.div variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="bg-charcoal hover:bg-charcoal-light text-cream px-10 py-7 text-base font-medium rounded-full shadow-elevated hover:shadow-gold transition-all duration-500 group relative overflow-hidden"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="relative z-10 flex items-center">
                    Contact Susan
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gold"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Profile Image with circular shape and enhanced animations */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center"
          >
            <motion.div
              className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56"
              whileHover={{
                scale: 1.1,
                rotate: [0, -5, 5, 0]
              }}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                rotate: {
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-gold via-yellow-400 to-amber-500 p-1"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 15px rgba(255, 215, 0, 0.4)",
                    "0 0 30px rgba(255, 215, 0, 0.8)",
                    "0 0 15px rgba(255, 215, 0, 0.4)"
                  ]
                }}
                transition={{
                  rotate: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  scale: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  },
                  boxShadow: {
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }
                }}
              >
                <div className="w-full h-full rounded-full bg-background overflow-hidden">
                  <img
                    src="/Susan Chen.jpeg"
                    alt="Susan Chen"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Secondary animated ring */}
              <motion.div
                className="absolute -inset-4 rounded-full border-2 border-gold/30"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.7, 0.3],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />

              {/* Tertiary subtle glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full border border-gold/20"
                animate={{
                  boxShadow: [
                    "0 0 10px rgba(255, 215, 0, 0.3)",
                    "0 0 20px rgba(255, 215, 0, 0.6)",
                    "0 0 10px rgba(255, 215, 0, 0.3)"
                  ],
                  scale: [1, 1.03, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />

              {/* Floating particles around the image */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-gold"
                  style={{
                    top: `${15 + Math.sin(i * 60) * 40}%`,
                    left: `${15 + Math.cos(i * 60) * 40}%`
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-gold" />
        </motion.div>
      </motion.div>

      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
      />
    </section>
  );
};

export default HeroSection;