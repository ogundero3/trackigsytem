import { Suspense } from 'react'
import TrackClient from '@/components/TrackClient'

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 text-white">Loading package status...</div>}>
      <TrackClient />
    </Suspense>
  )
}
