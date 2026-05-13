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

export default function TrackClient() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<string>('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return

    const fetchTrackingData = async () => {
      try {
        const response = await fetch(`/api/track?id=${id}`)
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
  }, [id])

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
              className="mb-6 bg-gradient-to-br from-amber-500/15 via-orange-500/15 to-red-500/15 rounded-xl p-6 border border-amber-500/40 backdrop-blur-sm shadow-xl"
            >
              <div className="flex gap-3 sm:gap-4">
                <div className="text-2xl sm:text-4xl mt-1 flex-shrink-0">⚠️</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-base sm:text-lg mb-2">Delivery Status Alert</h3>
                  <p className="text-gray-100 text-xs sm:text-sm mb-4 leading-relaxed">
                    We've encountered an unexpected delay with your shipment. Our logistics team is actively investigating the situation and working to resolve this issue as quickly as possible.
                  </p>
                  
                  <div className="bg-slate-800/50 rounded-lg p-3 sm:p-4 mb-4 border border-amber-500/20">
                    <h4 className="font-semibold text-white text-xs sm:text-sm mb-3">What's happening?</h4>
                    <ul className="space-y-2 text-xs text-gray-300">
                      <li>Package located at distribution facility</li>
                      <li>Weather-related delays affecting local delivery</li>
                      <li>Expected resolution: 24-48 hours</li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
                    <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                      <p className="text-xs text-gray-400 truncate">Support Ticket</p>
                      <p className="text-white font-mono font-bold text-xs sm:text-sm break-all">TKT-{trackingData.id.slice(-4)}</p>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                      <p className="text-xs text-gray-400 truncate">Contact Ref</p>
                      <p className="text-white font-mono font-bold text-xs sm:text-sm break-all">{trackingData.id}</p>
                    </div>
                  </div>

                  <div className="bg-blue-500/10 rounded-lg p-3 sm:p-4 border border-blue-500/30 mb-4">
                    <h4 className="font-semibold text-white text-xs sm:text-sm mb-2">Next Steps</h4>
                    <p className="text-xs text-blue-100 mb-3">
                      Our team will contact you within 24 hours. Reach us:
                    </p>
                    <div className="space-y-1 text-xs text-blue-200 break-words">
                      <p>support@shipstream.com</p>
                      <p>1-800-744-7878</p>
                      <p>Live Chat: 24/7</p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500">
                    Last checked: {new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} (EST)
                  </p>
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
