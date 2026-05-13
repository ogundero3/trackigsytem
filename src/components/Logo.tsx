'use client'

import { motion } from 'framer-motion'

export default function Logo() {
  // Animation for the flowing S letters
  const sFlowVariants = {
    animate: {
      pathLength: [0, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: 'loop',
      },
    },
  }

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const letterVariants = {
    animate: {
      opacity: [0.6, 1, 0.6],
      y: [-2, 2, -2],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  const glowVariants = {
    animate: {
      boxShadow: [
        '0 0 10px rgba(59, 130, 246, 0.3)',
        '0 0 20px rgba(251, 191, 36, 0.6)',
        '0 0 10px rgba(59, 130, 246, 0.3)',
      ],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  const streamVariants = {
    animate: {
      scaleX: [0.8, 1.1, 0.8],
      opacity: [0.4, 0.9, 0.4],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      className="flex items-center gap-3 sm:gap-3"
    >
      {/* ShipStream Typography Logo - Highly Visible */}
      <motion.div
        variants={containerVariants}
        animate="animate"
        className="relative w-24 h-16 sm:w-20 sm:h-14 flex-shrink-0"
      >
        <svg viewBox="0 0 120 100" className="w-full h-full">
          <defs>
            {/* Main gradient for S letters */}
            <linearGradient id="streamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#1e40af" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            {/* Secondary gradient for accents */}
            <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e40af" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>

            <filter id="shadowEffect">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodOpacity="0.4"/>
            </filter>

            <filter id="blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.5"/>
            </filter>
          </defs>

          {/* Background rounded rectangle - more visible */}
          <rect x="2" y="5" width="116" height="90" rx="16" fill="#0a0f1f" filter="url(#shadowEffect)" />

          {/* Animated flowing S - first letter */}
          <motion.path
            d="M 20 35 Q 25 25 32 25 Q 40 25 40 32 Q 40 38 32 42 Q 20 48 20 58 Q 20 68 30 72 Q 40 75 45 70"
            stroke="url(#streamGradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="1"
            variants={letterVariants}
            filter="url(#shadowEffect)"
          />

          {/* Animated flowing S - second letter */}
          <motion.path
            d="M 55 35 Q 60 25 67 25 Q 75 25 75 32 Q 75 38 67 42 Q 55 48 55 58 Q 55 68 65 72 Q 75 75 80 70"
            stroke="url(#streamGradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="1"
            variants={letterVariants}
            filter="url(#shadowEffect)"
          />

          {/* Animated stream effect - flowing arrow right */}
          <motion.g
            animate={{
              x: [0, 5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <path
              d="M 88 40 L 102 40"
              stroke="url(#accentGradient)"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="1"
              filter="url(#shadowEffect)"
            />
            <polygon points="105,40 100,35 100,45" fill="url(#accentGradient)" opacity="1" />
          </motion.g>

          {/* Flowing lines - stream concept */}
          <motion.line
            x1="88"
            y1="48"
            x2="102"
            y2="48"
            stroke="url(#accentGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="1"
            variants={streamVariants}
            filter="url(#shadowEffect)"
          />

          <motion.line
            x1="88"
            y1="56"
            x2="102"
            y2="56"
            stroke="url(#streamGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.95"
            variants={streamVariants}
            filter="url(#shadowEffect)"
          />

          {/* Top accent line - more visible */}
          <motion.line
            x1="18"
            y1="12"
            x2="95"
            y2="12"
            stroke="url(#accentGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="1"
            animate={{
              scaleX: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ originX: 0 }}
            filter="url(#shadowEffect)"
          />

          {/* Animated accent dots - larger */}
          <motion.circle
            cx="20"
            cy="88"
            r="3.5"
            fill="url(#accentGradient)"
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            filter="url(#shadowEffect)"
          />

          <motion.circle
            cx="35"
            cy="88"
            r="3.5"
            fill="url(#accentGradient)"
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1.5,
              delay: 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            filter="url(#shadowEffect)"
          />

          <motion.circle
            cx="50"
            cy="88"
            r="3.5"
            fill="url(#streamGradient)"
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1.5,
              delay: 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            filter="url(#shadowEffect)"
          />

          {/* Premium corner accent - more visible */}
          <motion.rect
            x="103"
            y="78"
            width="12"
            height="12"
            rx="2"
            fill="none"
            stroke="url(#accentGradient)"
            strokeWidth="2.5"
            opacity="1"
            animate={{
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ originX: 0.5, originY: 0.5 }}
            filter="url(#shadowEffect)"
          />
        </svg>
      </motion.div>

      {/* Text section */}
      <div className="hidden sm:block">
        <div className="text-sm font-black text-white tracking-tight leading-tight">
          Ship<span className="text-yellow-400">Stream</span>
        </div>
      </div>
    </motion.div>
  )
}
