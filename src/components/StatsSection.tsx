import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedCounter from "./AnimatedCounter";
import { Briefcase, Globe, Users, Award } from "lucide-react";

const stats = [
  {
    icon: Briefcase,
    value: 20,
    suffix: "+",
    label: "Years Experience",
    description: "In innovation & investment"
  },
  {
    icon: Globe,
    value: 4,
    suffix: "",
    label: "Continents",
    description: "Global presence"
  },
  {
    icon: Users,
    value: 100,
    suffix: "+",
    label: "Founders Mentored",
    description: "Across emerging markets"
  },
  {
    icon: Award,
    value: 10,
    suffix: "+",
    label: "Board Positions",
    description: "Strategic leadership"
  }
];

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-charcoal relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--gold)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      {/* Floating orbs */}
      <motion.div
        animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[10%] w-32 h-32 bg-gold/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-[15%] w-48 h-48 bg-gold/15 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10" ref={ref}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center group"
            >
              {/* Icon with glow effect */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-flex p-4 bg-gold/10 rounded-2xl mb-4 relative"
              >
                <div className="absolute inset-0 bg-gold/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <stat.icon className="w-7 h-7 text-gold relative z-10" />
              </motion.div>

              {/* Animated number */}
              <div className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-cream mb-2">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>

              {/* Label */}
              <h3 className="text-lg font-medium text-cream/90 mb-1">{stat.label}</h3>
              <p className="text-sm text-cream/50">{stat.description}</p>

              {/* Bottom accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                className="h-0.5 w-12 bg-gradient-to-r from-gold to-gold-light mx-auto mt-4"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;