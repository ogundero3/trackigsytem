'use client'

import { useState, useEffect } from 'react'

export default function Clock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/New_York',
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
      }
      setTime(now.toLocaleTimeString('en-US', options))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-white text-sm font-medium">
      {time} EST
    </div>
  )
}