"use client"

import { useState } from "react"
import { PipestreamVisualization } from "@/components/pipestream-visualization"
import { FeedbackForm } from "@/components/feedback-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PipestreamPage({ params }: { params: { id: string } }) {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

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

  const handleFeedbackSubmit = async (data: { confidence: number; comment: string }) => {
    console.log("Feedback submitted:", data)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setFeedbackSubmitted(true)
    setTimeout(() => setFeedbackSubmitted(false), 3000)
  }

  return (
    <main className="min-h-screen p-8 relative overflow-hidden">
      <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="glass-strong rounded-3xl p-8 mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Q1 Product Launch</h1>
          <p className="text-white/70 mb-4">Deadline: March 31, 2024</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="glass rounded-xl p-4">
              <div className="text-white/60 text-sm">Overall Confidence</div>
              <div className="text-3xl font-bold text-white">75%</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-white/60 text-sm">Team Members</div>
              <div className="text-3xl font-bold text-white">6</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-white/60 text-sm">Last Updated</div>
              <div className="text-3xl font-bold text-white">2h ago</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="glass rounded-3xl p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Team Hierarchy</h2>
              <PipestreamVisualization hierarchy={mockHierarchy} />
            </div>
          </div>

          <div>
            <FeedbackForm pipestreamId={params.id} onSubmit={handleFeedbackSubmit} />
            {feedbackSubmitted && (
              <div className="mt-4 glass-strong rounded-xl p-4 text-center text-green-400">
                Feedback submitted successfully!
              </div>
            )}
          </div>
        </div>

        <div className="glass rounded-3xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Recent Feedback</h2>
          <div className="space-y-4">
            {[
              { name: "Carol Davis", confidence: 90, comment: "On track, API integration complete", time: "2h ago" },
              { name: "David Lee", confidence: 60, comment: "Blocked on database migration", time: "4h ago" },
              { name: "Frank Wilson", confidence: 70, comment: "UI components 80% done", time: "5h ago" },
            ].map((feedback, idx) => (
              <div key={idx} className="glass-strong rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium text-white">{feedback.name}</div>
                  <div className="text-sm text-white/50">{feedback.time}</div>
                </div>
                <div className="text-sm text-white/70 mb-2">Confidence: {feedback.confidence}%</div>
                <div className="text-white/80">{feedback.comment}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
