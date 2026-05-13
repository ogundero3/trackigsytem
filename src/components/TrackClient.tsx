'use client'

import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Timeline from '@/components/Timeline'

interface TrackingData {
  id: string
  status: number
  currentStep: string
  estimatedDelivery: string
  progress: number
  events: Array<{
    step: string
    timestamp: string
  }>
  hasError: boolean
  errorMessage?: string
}

interface SessionData {
  trackingId: string
  startedAt: number
}

export default function TrackClient() {
  const searchParams = useSearchParams()
  const urlId = searchParams.get('id')
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<string>('')
  const [error, setError] = useState('')
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    // Initialize session and determine which tracking ID to use
    let trackingId = urlId
    let sessionData: SessionData | null = null

    // Try to restore session from localStorage
    try {
      const saved = localStorage.getItem('trackingSession')
      if (saved) {
        sessionData = JSON.parse(saved)
      }
    } catch (err) {
      console.error('Failed to parse session:', err)
    }

    // If URL has ID, use it and save new session
    if (urlId) {
      sessionData = {
        trackingId: urlId,
        startedAt: Date.now(),
      }
      try {
        localStorage.setItem('trackingSession', JSON.stringify(sessionData))
      } catch (err) {
        console.error('Failed to save session:', err)
      }
    }
    // Otherwise use restored session if available
    else if (sessionData) {
      trackingId = sessionData.trackingId
    }

    if (!trackingId) {
      setLoading(false)
      return
    }

    setActiveId(trackingId)

    const fetchTrackingData = async () => {
      try {
        // Pass startedAt time to API so it maintains consistent progression
        const params = new URLSearchParams({
          id: trackingId,
          ...(sessionData && { startedAt: sessionData.startedAt.toString() }),
        })
        const response = await fetch(`/api/track?${params}`)
        if (response.ok) {
          const data = await response.json()
          setTrackingData(data)
          setLastUpdated(new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'America/New_York'
          }))
          setError('')
        } else {
          setError('Invalid tracking ID')
        }
      } catch (err) {
        setError('Failed to fetch tracking data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTrackingData()
    
    // Refresh tracking data every 30 seconds to show real-time progression
    const interval = setInterval(fetchTrackingData, 30 * 1000)
    
    return () => clearInterval(interval)
  }, [urlId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-12 h-12 border-4 border-blue-500 border-t-blue-200 rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-white mb-2">Loading...</h1>
          <p className="text-gray-400">Fetching tracking information</p>
        </motion.div>
      </div>
    )
  }

  if (error || !trackingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold text-white mb-4">Invalid Tracking ID</h1>
          <p className="text-gray-400">{error || 'Please check your tracking ID and try again.'}</p>
        </motion.div>
      </div>
    )
  }

  const getStatusColor = (status: number) => {
    if (status === 1) return 'from-yellow-500 to-yellow-600'
    if (status === 2) return 'from-blue-500 to-blue-600'
    if (status === 3) return 'from-purple-500 to-purple-600'
    return 'from-green-500 to-green-600'
  }

  const getStatusLabel = (status: number) => {
    const labels = ['', 'Received', 'In Transit', 'Out for Delivery', 'Delivered']
    return labels[status] || 'Unknown'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b border-blue-500/10 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-40"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="/"
            className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
          >
            ShipStream
          </motion.a>
          <a href="/" className="text-gray-400 hover:text-gray-200 text-xs sm:text-sm transition">Back Home</a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8"
      >
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2">Shipment Tracking</h1>
          <p className="text-gray-400 text-sm sm:text-base">Real-time package delivery monitoring</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-2xl border border-blue-500/20">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <p className="text-blue-300 font-medium text-xs uppercase tracking-wide mb-1 sm:mb-2">Tracking ID</p>
                <p className="text-white font-mono text-2xl sm:text-3xl font-bold break-all">{trackingData.id}</p>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-white font-bold text-xs sm:text-sm bg-gradient-to-r ${getStatusColor(trackingData.status)} shadow-lg whitespace-nowrap`}
              >
                {getStatusLabel(trackingData.status)}
              </motion.div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6 sm:mb-8">
              <div className="flex justify-between items-center mb-2 sm:mb-3">
                <p className="text-gray-300 text-xs sm:text-sm font-semibold">Shipment Progress</p>
                <p className="text-blue-300 font-bold text-base sm:text-lg">{trackingData.progress}%</p>
              </div>
              <div className="h-2 sm:h-3 bg-slate-700/50 rounded-full overflow-hidden border border-blue-500/20 shadow-lg">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${trackingData.progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className={`h-full bg-gradient-to-r ${getStatusColor(trackingData.status)} shadow-lg shadow-blue-500/50`}
                />
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-slate-700/30 backdrop-blur rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-500/20"
              >
                <p className="text-gray-500 text-xs uppercase font-semibold mb-2">Est. Delivery</p>
                <p className="text-white font-bold text-base sm:text-lg">{trackingData.estimatedDelivery}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-700/30 backdrop-blur rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-500/20"
              >
                <p className="text-gray-500 text-xs uppercase font-semibold mb-2">Last Updated</p>
                <p className="text-white font-mono font-bold text-base sm:text-lg">{lastUpdated}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-slate-700/30 backdrop-blur rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-500/20"
              >
                <p className="text-gray-500 text-xs uppercase font-semibold mb-2">Status</p>
                <p className="text-white font-bold text-base sm:text-lg">Active</p>
              </motion.div>
            </div>
          </div>
          
          {/* Error Alert */}
          {trackingData.hasError && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 sm:mb-8 bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-red-500/10 rounded-lg sm:rounded-2xl p-4 sm:p-6 border border-amber-500/30 backdrop-blur-sm shadow-lg"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="text-3xl sm:text-2xl flex-shrink-0">⚠️</div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-base sm:text-lg mb-2">Delivery Delayed</h3>
                  <p className="text-gray-200 text-xs sm:text-sm mb-4 leading-relaxed">
                    Your shipment is experiencing an unexpected delay. Our logistics team is investigating and working to resolve this.
                  </p>
                  
                  <div className="bg-slate-800/40 rounded-lg p-3 sm:p-4 mb-4 border border-amber-500/20">
                    <h4 className="font-semibold text-white text-xs sm:text-sm mb-2">Status Update</h4>
                    <ul className="space-y-1 text-xs text-gray-300">
                      <li>• Package in transit but behind schedule</li>
                      <li>• Expected delivery within 24-48 hours</li>
                      <li>• We are monitoring this shipment closely</li>
                    </ul>
                  </div>

                  <div className="bg-blue-500/10 rounded-lg p-3 sm:p-4 border border-blue-500/20">
                    <p className="text-xs text-blue-200">
                      Support Team: <span className="text-blue-100 font-semibold">support@shipstream.com</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Timeline Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Delivery Timeline</h2>
            </div>
            <Timeline events={trackingData.events} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
