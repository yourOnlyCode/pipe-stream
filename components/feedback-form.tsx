"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { motion } from "framer-motion"

interface FeedbackFormProps {
  pipestreamId: string
  onSubmit: (data: { confidence: number; comment: string }) => Promise<void>
}

export function FeedbackForm({ pipestreamId, onSubmit }: FeedbackFormProps) {
  const [confidence, setConfidence] = useState([50])
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onSubmit({ confidence: confidence[0], comment })
      setComment("")
      setConfidence([50])
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="glass-strong rounded-2xl p-6 space-y-6"
    >
      <div>
        <Label htmlFor="confidence" className="text-lg mb-4 block">
          Confidence Level: {confidence[0]}%
        </Label>
        <Slider
          id="confidence"
          value={confidence}
          onValueChange={setConfidence}
          max={100}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-white/50 mt-2">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      <div>
        <Label htmlFor="comment" className="mb-2 block">
          Comments (Optional)
        </Label>
        <Input
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts, blockers, or updates..."
          className="min-h-[100px]"
        />
      </div>

      <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Feedback"}
      </Button>
    </motion.form>
  )
}
