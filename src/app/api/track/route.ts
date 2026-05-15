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
    updateIntervalMinutes: 40,
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
    updateIntervalMinutes: 40,
  },
  'USS2156843': {
    createdAt: new Date(Date.now()),
    origin: 'Chicago Distribution Center',
    destination: 'Seattle, WA',
    steps: [
      { step: 'We have received your package.' },
      { step: 'Your package is on the way.' },
      { step: 'Out for delivery.' },
      { step: 'Delivered successfully.' },
    ],
    updateIntervalMinutes: 40,
  },
  'USS3298475': {
    createdAt: new Date(Date.now()),
    origin: 'Dallas Distribution Center',
    destination: 'Boston, MA',
    steps: [
      { step: 'We have received your package.' },
      { step: 'Your package is on the way.' },
      { step: 'Out for delivery.' },
      { step: 'Delivered successfully.' },
    ],
    updateIntervalMinutes: 40,
  },
  'USS4102567': {
    createdAt: new Date(Date.now()),
    origin: 'Houston Distribution Center',
    destination: 'Denver, CO',
    steps: [
      { step: 'We have received your package.' },
      { step: 'Your package is on the way.' },
      { step: 'Out for delivery.' },
      { step: 'Delivered successfully.' },
    ],
    updateIntervalMinutes: 40,
  },
  'USS5067284': {
    createdAt: new Date(Date.now()),
    origin: 'Phoenix Distribution Center',
    destination: 'Portland, OR',
    steps: [
      { step: 'We have received your package.' },
      { step: 'Your package is on the way.' },
      { step: 'Out for delivery.' },
      { step: 'Delivered successfully.' },
    ],
    updateIntervalMinutes: 40,
  },
  'USS6182934': {
    createdAt: new Date(Date.now()),
    origin: 'Atlanta Distribution Center',
    destination: 'Las Vegas, NV',
    steps: [
      { step: 'We have received your package.' },
      { step: 'Your package is on the way.' },
      { step: 'Out for delivery.' },
      { step: 'Delivered successfully.' },
    ],
    updateIntervalMinutes: 40,
  },
  'USS7239845': {
    createdAt: new Date(Date.now()),
    origin: 'Philadelphia Distribution Center',
    destination: 'Austin, TX',
    steps: [
      { step: 'We have received your package.' },
      { step: 'Your package is on the way.' },
      { step: 'Out for delivery.' },
      { step: 'Delivered successfully.' },
    ],
    updateIntervalMinutes: 40,
  },
  'USS8156723': {
    createdAt: new Date(Date.now()),
    origin: 'San Antonio Distribution Center',
    destination: 'Memphis, TN',
    steps: [
      { step: 'We have received your package.' },
      { step: 'Your package is on the way.' },
      { step: 'Out for delivery.' },
      { step: 'Delivered successfully.' },
    ],
    updateIntervalMinutes: 40,
  },
  'USS9247156': {
    createdAt: new Date(Date.now()),
    origin: 'San Diego Distribution Center',
    destination: 'Baltimore, MD',
    steps: [
      { step: 'We have received your package.' },
      { step: 'Your package is on the way.' },
      { step: 'Out for delivery.' },
      { step: 'Delivered successfully.' },
    ],
    updateIntervalMinutes: 40,
  },
  'USS1023456': {
    createdAt: new Date(Date.now()),
    origin: 'Dallas Distribution Center',
    destination: 'Louisville, KY',
    steps: [
      { step: 'We have received your package.' },
      { step: 'Your package is on the way.' },
      { step: 'Out for delivery.' },
      { step: 'Delivered successfully.' },
    ],
    updateIntervalMinutes: 40,
  },
  'USS1134567': {
    createdAt: new Date(Date.now()),
    origin: 'San Jose Distribution Center',
    destination: 'Portland, OR',
    steps: [
      { step: 'We have received your package.' },
      { step: 'Your package is on the way.' },
      { step: 'Out for delivery.' },
      { step: 'Delivered successfully.' },
    ],
    updateIntervalMinutes: 40,
  },
  'USS1245678': {
    createdAt: new Date(Date.now()),
    origin: 'Austin Distribution Center',
    destination: 'Las Vegas, NV',
    steps: [
      { step: 'We have received your package.' },
      { step: 'Your package is on the way.' },
      { step: 'Out for delivery.' },
      { step: 'Delivered successfully.' },
    ],
    updateIntervalMinutes: 40,
  },
  'USS1356789': {
    createdAt: new Date(Date.now()),
    origin: 'Jacksonville Distribution Center',
    destination: 'New Orleans, LA',
    steps: [
      { step: 'We have received your package.' },
      { step: 'Your package is on the way.' },
      { step: 'Out for delivery.' },
      { step: 'Delivered successfully.' },
    ],
    updateIntervalMinutes: 40,
  },
  'USS1467890': {
    createdAt: new Date(Date.now()),
    origin: 'Fort Worth Distribution Center',
    destination: 'Cleveland, OH',
    steps: [
      { step: 'We have received your package.' },
      { step: 'Your package is on the way.' },
      { step: 'Out for delivery.' },
      { step: 'Delivered successfully.' },
    ],
    updateIntervalMinutes: 40,
  },
  'USS1578901': {
    createdAt: new Date(Date.now()),
    origin: 'Columbus Distribution Center',
    destination: 'Pittsburgh, PA',
    steps: [
      { step: 'We have received your package.' },
      { step: 'Your package is on the way.' },
      { step: 'Out for delivery.' },
      { step: 'Delivered successfully.' },
    ],
    updateIntervalMinutes: 40,
  },
  'USS1689012': {
    createdAt: new Date(Date.now()),
    origin: 'Charlotte Distribution Center',
    destination: 'Sacramento, CA',
    steps: [
      { step: 'We have received your package.' },
      { step: 'Your package is on the way.' },
      { step: 'Out for delivery.' },
      { step: 'Delivered successfully.' },
    ],
    updateIntervalMinutes: 40,
  },
  'USS1790123': {
    createdAt: new Date(Date.now()),
    origin: 'San Francisco Distribution Center',
    destination: 'Long Beach, CA',
    steps: [
      { step: 'We have received your package.' },
      { step: 'Your package is on the way.' },
      { step: 'Out for delivery.' },
      { step: 'Delivered successfully.' },
    ],
    updateIntervalMinutes: 40,
  },
  'USS1801234': {
    createdAt: new Date(Date.now()),
    origin: 'Indianapolis Distribution Center',
    destination: 'Kansas City, MO',
    steps: [
      { step: 'We have received your package.' },
      { step: 'Your package is on the way.' },
      { step: 'Out for delivery.' },
      { step: 'Delivered successfully.' },
    ],
    updateIntervalMinutes: 40,
  },
  'USS1912345': {
    createdAt: new Date(Date.now()),
    origin: 'Seattle Distribution Center',
    destination: 'Arlington, TX',
    steps: [
      { step: 'We have received your package.' },
      { step: 'Your package is on the way.' },
      { step: 'Out for delivery.' },
      { step: 'Delivered successfully.' },
    ],
    updateIntervalMinutes: 40,
  },
  'USS2023456': {
    createdAt: new Date(Date.now()),
    origin: 'Denver Distribution Center',
    destination: 'Corpus Christi, TX',
    steps: [
      { step: 'We have received your package.' },
      { step: 'Your package is on the way.' },
      { step: 'Out for delivery.' },
      { step: 'Delivered successfully.' },
    ],
    updateIntervalMinutes: 40,
  },
  'USS2134567': {
    createdAt: new Date(Date.now()),
    origin: 'Boston Distribution Center',
    destination: 'Lexington, KY',
    steps: [
      { step: 'We have received your package.' },
      { step: 'Your package is on the way.' },
      { step: 'Out for delivery.' },
      { step: 'Delivered successfully.' },
    ],
    updateIntervalMinutes: 40,
  },
  'USS2245678': {
    createdAt: new Date(Date.now()),
    origin: 'El Paso Distribution Center',
    destination: 'Chandler, AZ',
    steps: [
      { step: 'We have received your package.' },
      { step: 'Your package is on the way.' },
      { step: 'Out for delivery.' },
      { step: 'Delivered successfully.' },
    ],
    updateIntervalMinutes: 40,
  },
  'USS2356789': {
    createdAt: new Date(Date.now()),
    origin: 'Nashville Distribution Center',
    destination: 'Stockton, CA',
    steps: [
      { step: 'We have received your package.' },
      { step: 'Your package is on the way.' },
      { step: 'Out for delivery.' },
      { step: 'Delivered successfully.' },
    ],
    updateIntervalMinutes: 40,
  },
  'USS2467890': {
    createdAt: new Date(Date.now()),
    origin: 'Detroit Distribution Center',
    destination: 'Cincinnati, OH',
    steps: [
      { step: 'We have received your package.' },
      { step: 'Your package is on the way.' },
      { step: 'Out for delivery.' },
      { step: 'Delivered successfully.' },
    ],
    updateIntervalMinutes: 40,
  },
  'USS2578901': {
    createdAt: new Date(Date.now()),
    origin: 'Oklahoma City Distribution Center',
    destination: 'St Paul, MN',
    steps: [
      { step: 'We have received your package.' },
      { step: 'Your package is on the way.' },
      { step: 'Out for delivery.' },
      { step: 'Delivered successfully.' },
    ],
    updateIntervalMinutes: 40,
  },
  'USS2689012': {
    createdAt: new Date(Date.now()),
    origin: 'Portland Distribution Center',
    destination: 'Toledo, OH',
    steps: [
      { step: 'We have received your package.' },
      { step: 'Your package is on the way.' },
      { step: 'Out for delivery.' },
      { step: 'Delivered successfully.' },
    ],
    updateIntervalMinutes: 40,
  },
  'USS2790123': {
    createdAt: new Date(Date.now()),
    origin: 'Las Vegas Distribution Center',
    destination: 'Newark, NJ',
    steps: [
      { step: 'We have received your package.' },
      { step: 'Your package is on the way.' },
      { step: 'Out for delivery.' },
      { step: 'Delivered successfully.' },
    ],
    updateIntervalMinutes: 40,
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
