import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Activity } from 'lucide-react';

interface Props {
  onComplete: () => void;
  username: string;
}

export function AnalysisLoader({ onComplete, username }: Props) {
  const [phase, setPhase] = useState('Analyzing physiology...');

  useEffect(() => {
    const phases = [
      'Mapping muscle groups...',
      'Cross-referencing goals...',
      'Synthesizing weekly roadmap...',
      'Calibrating intensity levels...',
      `We've engineered the perfect roadmap for you, ${username}! Let's get to work.`
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < phases.length) {
        setPhase(phases[i]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 1800); // Wait longer so they can read the coaching message
      }
    }, 800); // Each phase lasts 800ms

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--bg-main)] text-zinc-100 p-4 w-full relative overflow-hidden">
      {/* Neon pulsing background glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut"
        }}
        className="absolute w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]"
      />

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 0 0px 0px rgba(16, 185, 129, 0)',
              '0 0 20px 4px rgba(16, 185, 129, 0.3)',
              '0 0 0px 0px rgba(16, 185, 129, 0)'
            ]
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut"
          }}
          className="bg-zinc-900 border border-emerald-500/30 p-5 rounded-full mb-8 shadow-sm"
        >
          <Activity className="w-10 h-10 text-emerald-400" />
        </motion.div>

        <motion.h2 
          key={phase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-lg font-medium tracking-tight text-emerald-400 font-mono"
        >
          {phase}
        </motion.h2>
      </div>
    </div>
  );
}
