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

// Server-side storage: Map tracking ID to when it was first started
// This persists across requests and devices using the same tracking ID
const TRACKING_SESSIONS = new Map<string, number>()

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

  let sessionStartTime: number

  // Check if this tracking ID was previously started (cross-device persistence)
  if (TRACKING_SESSIONS.has(trackingId)) {
    sessionStartTime = TRACKING_SESSIONS.get(trackingId)!
    console.log(`✓ [API] Retrieved existing session for ${trackingId}: started at ${new Date(sessionStartTime).toLocaleString()}`)
  }
  // If not, check if client provided one (from localStorage)
  else if (clientStartedAt) {
    sessionStartTime = parseInt(clientStartedAt, 10)
    TRACKING_SESSIONS.set(trackingId, sessionStartTime)
    console.log(`✓ [API] Saved new session for ${trackingId}: started at ${new Date(sessionStartTime).toLocaleString()}`)
  }
  // Otherwise this is first request - create session now
  else {
    sessionStartTime = Date.now()
    TRACKING_SESSIONS.set(trackingId, sessionStartTime)
    console.log(`✓ [API] First request for ${trackingId}: created session at ${new Date(sessionStartTime).toLocaleString()}`)
  }

  const trackingData = TRACKING_DATABASE[trackingId as keyof typeof TRACKING_DATABASE]
  const elapsedMs = Date.now() - sessionStartTime
  const elapsedMin = Math.floor(elapsedMs / 1000 / 60)
  
  console.log(`📦 [API] Tracking ${trackingId}: elapsed=${elapsedMin}min, progress=${Math.ceil((elapsedMin / 120) * 100)}%`)
  
  trackingData.createdAt = new Date(sessionStartTime)
  
  const currentStatus = calculateStatus(trackingData)
  const events = generateEvents(trackingData, currentStatus)
  
  // Calculate if delivery is delayed (expected time has passed)
  const now = new Date()
  const expectedDeliveryTime = new Date(
    trackingData.createdAt.getTime() + 3 * trackingData.updateIntervalMinutes * 60 * 1000,
  )
  const isDelayed = now > expectedDeliveryTime

  const response: TrackingData = {
    id: trackingId,
    status: currentStatus,
    currentStep: trackingData.steps[Math.min(currentStatus - 1, trackingData.steps.length - 1)].step,
    progress: currentStatus === 3 ? 75 : Math.round((currentStatus / trackingData.steps.length) * 100),
    estimatedDelivery: expectedDeliveryTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    events,
    hasError: isDelayed,
    errorMessage: isDelayed ? 'Delivery delayed - Our team is investigating this issue. We will contact you shortly.' : undefined,
  }

  return NextResponse.json(response)
}
