'use client'

import { motion } from 'framer-motion'

interface TimelineEvent {
  step: string
  timestamp: string
}

interface TimelineProps {
  events: TimelineEvent[]
}

export default function Timeline({ events }: TimelineProps) {
  if (!events || events.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        <p>No tracking events yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {events.map((event, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.15, duration: 0.5 }}
          className="flex gap-3 sm:gap-4"
        >
          {/* Timeline dot and line */}
          <div className="flex flex-col items-center flex-shrink-0">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.15 + 0.1 }}
              className="w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 ring-3 sm:ring-4 ring-blue-500/20 shadow-lg shadow-blue-500/50"
            />
            {index !== events.length - 1 && (
              <div className="w-1 h-16 sm:h-20 bg-gradient-to-b from-blue-500 to-blue-500/20 mt-2" />
            )}
          </div>

          {/* Event content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.15 + 0.15 }}
            className="pb-2 flex-1 pt-0 sm:pt-1 min-w-0"
          >
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-lg p-3 sm:p-4 border border-blue-500/30 hover:border-blue-400/60 transition-all hover:shadow-lg hover:shadow-blue-500/20 hover:bg-blue-500/15">
              <p className="text-blue-100 font-semibold text-sm sm:text-base">{event.step}</p>
              <div className="mt-2 sm:mt-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 font-bold text-xs sm:text-sm">Completed</span>
                </div>
                <p className="text-xs text-gray-500 font-mono truncate">{event.timestamp}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Future events placeholder */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: events.length * 0.15 + 0.1 }}
        className="flex gap-3 sm:gap-4"
      >
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-gray-600/50 ring-3 sm:ring-4 ring-gray-600/10" />
        </div>
        <div className="pb-2 flex-1 pt-0 sm:pt-1">
          <div className="text-gray-500 italic text-xs sm:text-sm p-3 sm:p-4">
            Awaiting next update...
          </div>
        </div>
      </motion.div>
    </div>
  )
}