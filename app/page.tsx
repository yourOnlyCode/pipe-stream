import { PipestreamVisualization } from "@/components/pipestream-visualization"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  const mockHierarchy = [
    {
      user: { name: "Alice Chen", confidence: 85 },
      level: 0,
      children: [
        {
          user: { name: "Bob Smith", confidence: 75 },
          level: 1,
          children: [
            { user: { name: "Carol Davis", confidence: 90 }, level: 2 },
            { user: { name: "David Lee", confidence: 60 }, level: 2 },
          ],
        },
        {
          user: { name: "Eve Martinez", confidence: 80 },
          level: 1,
          children: [
            { user: { name: "Frank Wilson", confidence: 70 }, level: 2 },
          ],
        },
      ],
    },
  ]

  return (
    <main className="min-h-screen p-8 relative overflow-hidden">
      <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto">
        <div className="glass-strong rounded-3xl p-8 mb-8 shadow-2xl">
          <h1 className="text-4xl font-bold text-white mb-2">Pipestream</h1>
          <p className="text-white/70">Visual feedback pipeline for your team</p>
        </div>

        <div className="glass rounded-3xl p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">Active Pipestreams</h2>
            <Button variant="primary">Create New Pipestream</Button>
          </div>

          <div className="glass-strong rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-medium text-white mb-2">Q1 Product Launch</h3>
            <p className="text-white/60 text-sm mb-4">Deadline: March 31, 2024</p>
            <div className="mb-4">
              <div className="text-sm text-white/70 mb-2">Overall Confidence: 75%</div>
              <div className="h-2 glass rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: "75%" }} />
              </div>
            </div>
            <Link href="/pipestream/demo">
              <Button variant="ghost" className="w-full">View Details</Button>
            </Link>
          </div>
        </div>

        <div className="glass rounded-3xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Preview: Team Hierarchy</h2>
          <PipestreamVisualization hierarchy={mockHierarchy} />
        </div>
      </div>
    </main>
  )
}
