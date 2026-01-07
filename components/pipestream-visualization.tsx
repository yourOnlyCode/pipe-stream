"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface PipestreamNodeProps {
  user: {
    name: string
    avatarUrl?: string
    confidence?: number
  }
  level: number
  children?: PipestreamNodeProps[]
}

export function PipestreamNode({ user, level, children }: PipestreamNodeProps) {
  const hasChildren = children && children.length > 0

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: level * 0.1 }}
        className="relative"
      >
        <div className="glass-strong rounded-2xl p-4 min-w-[200px] hover:glow transition-all">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-lg font-bold">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                user.name.charAt(0).toUpperCase()
              )}
            </div>
            <div className="flex-1">
              <div className="font-medium text-white">{user.name}</div>
              {user.confidence !== undefined && (
                <div className="text-sm text-white/70">
                  Confidence: {user.confidence}%
                </div>
              )}
            </div>
          </div>
        </div>

        {hasChildren && (
          <div className="absolute left-1/2 -translate-x-1/2 top-full">
            <motion.div
              className="w-1 h-12 bg-gradient-to-b from-blue-400 to-cyan-400 relative overflow-hidden"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="absolute inset-0 bg-white/30"
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>
        )}
      </motion.div>

      {hasChildren && (
        <div className="flex gap-8 mt-12">
          {children.map((child, idx) => (
            <PipestreamNode key={idx} {...child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

interface PipestreamVisualizationProps {
  hierarchy: PipestreamNodeProps[]
  className?: string
}

export function PipestreamVisualization({ hierarchy, className }: PipestreamVisualizationProps) {
  return (
    <div className={cn("w-full overflow-x-auto py-8", className)}>
      <div className="flex justify-center min-w-max px-8">
        <div className="flex gap-8">
          {hierarchy.map((node, idx) => (
            <PipestreamNode key={idx} {...node} level={0} />
          ))}
        </div>
      </div>
    </div>
  )
}
