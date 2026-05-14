import { NextRequest, NextResponse } from 'next/server'

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

const TRACKING_DATABASE = {
  'USS0947261': {
    createdAt: new Date(Date.now()),
    origin: 'New York Distribution Center',
    destination: 'San Francisco, CA',
    steps: [
      { step: 'We have received your package.' },
      { step: 'Your package is on the way.' },
      { step: 'Out for delivery.' },
      { step: 'Delivered successfully.' },
    ],
    updateIntervalMinutes: 40, // Status updates every 40 minutes - total 2 hours to stage 3
  },
  'USS1384529': {
    createdAt: new Date(Date.now()),
    origin: 'Los Angeles Distribution Center',
    destination: 'Miami, FL',
    steps: [
      { step: 'We have received your package.' },
      { step: 'Your package is on the way.' },
      { step: 'Out for delivery.' },
      { step: 'Delivered successfully.' },
    ],
    updateIntervalMinutes: 40, // Status updates every 40 minutes - total 2 hours to stage 3
  },
}

function calculateStatus(
  trackingData: (typeof TRACKING_DATABASE)[keyof typeof TRACKING_DATABASE],
): number {
  const now = new Date()
  const elapsedMinutes = (now.getTime() - trackingData.createdAt.getTime()) / (1000 * 60)
  const statusIndex = Math.floor(elapsedMinutes / trackingData.updateIntervalMinutes)
  // Cap at status 3 (Out for delivery) - never go to delivered
  return Math.min(statusIndex + 1, 3)
}

function generateEvents(
  trackingData: (typeof TRACKING_DATABASE)[keyof typeof TRACKING_DATABASE],
  currentStatus: number,
): Array<{ step: string; timestamp: string }> {
  const events = []
  for (let i = 0; i < currentStatus; i++) {
    const stepData = trackingData.steps[i]
    const eventTime = new Date(
      trackingData.createdAt.getTime() + i * trackingData.updateIntervalMinutes * 60 * 1000,
    )
    events.push({
      step: stepData.step,
      timestamp: eventTime.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/New_York',
      }),
    })
  }
  return events
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const trackingId = searchParams.get('id')
  const clientStartedAt = searchParams.get('startedAt')

  if (!trackingId || !(trackingId in TRACKING_DATABASE)) {
    return NextResponse.json({ error: 'Tracking ID not found' }, { status: 404 })
  }

  if (!clientStartedAt) {
    console.error(`❌ [API] Missing startedAt for ${trackingId}`)
    return NextResponse.json({ error: 'Missing startedAt parameter' }, { status: 400 })
  }

  const trackingData = TRACKING_DATABASE[trackingId as keyof typeof TRACKING_DATABASE]
  const sessionStartTime = parseInt(clientStartedAt, 10)
  const elapsedMs = Date.now() - sessionStartTime
  const elapsedMin = Math.floor(elapsedMs / 1000 / 60)
  
  trackingData.createdAt = new Date(sessionStartTime)
  
  const currentStatus = calculateStatus(trackingData)
  const events = generateEvents(trackingData, currentStatus)
  
  // Calculate if delivery is delayed (120 minutes elapsed)
  // Once it reaches error state, it stays in error state FOREVER
  const now = new Date()
  const errorTime = new Date(sessionStartTime + 120 * 60 * 1000) // 120 minutes
  const isDelayed = now >= errorTime

  const response: TrackingData = {
    id: trackingId,
    status: isDelayed ? 4 : currentStatus, // Status 4 = Error state (stays forever)
    currentStep: isDelayed 
      ? 'Delivery Delayed' 
      : trackingData.steps[Math.min(currentStatus - 1, trackingData.steps.length - 1)].step,
    progress: isDelayed ? 75 : (currentStatus === 3 ? 75 : Math.round((currentStatus / trackingData.steps.length) * 100)),
    estimatedDelivery: errorTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    events,
    hasError: isDelayed,
    errorMessage: isDelayed ? 'Your shipment is experiencing an unexpected delay. Our logistics team is investigating and working to resolve this.' : undefined,
  }

  return NextResponse.json(response)
}
