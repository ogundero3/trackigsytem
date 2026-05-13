'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Logo from '@/components/Logo'

export default function Home() {
  const [trackingId, setTrackingId] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleTrack = async () => {
    if (!trackingId.trim()) {
      setError('Please enter your tracking ID')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/track?id=${trackingId}`)
      if (response.ok) {
        router.push(`/track?id=${trackingId}`)
      } else {
        setError('Invalid tracking ID. Please verify and try again.')
      }
    } catch (err) {
      setError('Unable to process your request. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTrack()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-xl border-b border-blue-500/10 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3 flex justify-between items-center">
          <Logo />
          <div className="hidden md:flex gap-8 text-sm text-gray-300">
            <a href="#features" className="hover:text-blue-400 transition">Features</a>
            <a href="#tracking" className="hover:text-blue-400 transition">Tracking</a>
            <a href="#contact" className="hover:text-blue-400 transition">Support</a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-16 md:pt-24 pb-8">
        <div className="max-w-5xl mx-auto w-full">
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-40 left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-40 right-20 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"></div>
          </div>

          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6 mt-16 sm:mt-0"
            >
              <div className="inline-block px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-lg text-blue-300 text-xs sm:text-sm font-semibold">
                Enterprise Shipment Tracking Platform
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
            >
              Track Shipments with
              <span className="block bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Complete Visibility
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-2"
            >
              Professional logistics tracking for enterprises. Real-time updates, comprehensive analytics, and dedicated support for your supply chain.
            </motion.p>

            {/* Tracking Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              id="tracking"
              className="max-w-2xl mx-auto w-full mb-12 md:mb-20"
            >
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-blue-500/20 shadow-2xl">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Access Your Shipment</h2>
                <p className="text-gray-400 text-sm mb-6">Enter the tracking ID sent to your registered email address</p>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <input
                    type="text"
                    placeholder="Enter tracking ID from your email"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                    onKeyPress={handleKeyPress}
                    disabled={loading}
                    className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-slate-700/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-600 transition disabled:opacity-50 text-sm sm:text-base"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleTrack}
                    disabled={loading}
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg sm:rounded-xl shadow-lg hover:shadow-blue-600/40 transition-all disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap text-sm sm:text-base"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="hidden sm:inline">Verifying</span>
                      </>
                    ) : (
                      <>
                        <span>Track</span>
                        <span className="hidden sm:inline">Shipment</span>
                      </>
                    )}
                  </motion.button>
                </div>
                
                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-xs sm:text-sm mt-4 bg-red-500/10 border border-red-500/30 rounded-lg p-3"
                  >
                    {error}
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Info Cards */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12 md:mb-20"
            >
              {[
                { label: 'Active Routes', value: '195 Countries' },
                { label: 'System Reliability', value: '99.9% Uptime' },
                { label: 'Support', value: '24/7 Available' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-800/30 backdrop-blur rounded-lg sm:rounded-xl p-4 sm:p-6 border border-blue-500/10"
                >
                  <p className="text-gray-400 text-xs sm:text-sm">{stat.label}</p>
                  <p className="text-lg sm:text-2xl font-bold text-blue-400 mt-2">{stat.value}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-20 px-4 bg-gradient-to-b from-transparent to-blue-500/5">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-12 md:mb-16"
          >
            Platform Capabilities
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { 
                title: 'Real-Time Tracking', 
                desc: 'Live shipment updates with 30-second refresh intervals for maximum operational visibility' 
              },
              { 
                title: 'Security Infrastructure', 
                desc: 'Enterprise-grade encryption and compliance with international logistics standards' 
              },
              { 
                title: 'Advanced Reporting', 
                desc: 'Detailed analytics and insights on shipment performance and delivery metrics' 
              },
              { 
                title: 'Global Coverage', 
                desc: 'Track shipments across 195 countries with localized logistics expertise' 
              },
              { 
                title: 'Priority Support', 
                desc: 'Dedicated support team available around the clock for immediate assistance' 
              },
              { 
                title: 'API Integration', 
                desc: 'Seamless connectivity with existing enterprise logistics and management systems' 
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-800/40 backdrop-blur border border-blue-500/20 rounded-lg md:rounded-xl p-6 md:p-8 hover:border-blue-500/50 transition"
              >
                <h3 className="text-lg md:text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-blue-500/10 bg-slate-950 py-4 md:py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-6">
            <div>
              <h3 className="font-bold text-white mb-2 text-sm">ShipStream</h3>
              <p className="text-gray-500 text-xs">Enterprise logistics tracking platform</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2 text-sm">Product</h4>
              <ul className="space-y-1 text-xs text-gray-500">
                <li><a href="#" className="hover:text-blue-400 transition">Features</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2 text-sm">Company</h4>
              <ul className="space-y-1 text-xs text-gray-500">
                <li><a href="#" className="hover:text-blue-400 transition">About</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Blog</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2 text-sm">Support</h4>
              <ul className="space-y-1 text-xs text-gray-500">
                <li><a href="#" className="hover:text-blue-400 transition">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Contact</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-500/10 pt-3 text-center text-gray-500 text-xs">
            <p>ShipStream 2026. All rights reserved. Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  )
}