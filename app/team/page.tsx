"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, Mail, User } from "lucide-react"
import { motion } from "framer-motion"

export interface TeamMember {
  id: string
  name: string
  email: string
  role?: string
  status: "active" | "pending"
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([
    { id: "1", name: "Alice Chen", email: "alice@company.com", role: "Director", status: "active" },
    { id: "2", name: "Bob Smith", email: "bob@company.com", role: "Manager", status: "active" },
    { id: "3", name: "Carol Davis", email: "carol@company.com", role: "Developer", status: "active" },
  ])
  const [isInviting, setIsInviting] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteName, setInviteName] = useState("")

  const handleInvite = () => {
    if (inviteEmail && inviteName) {
      setMembers([...members, {
        id: Date.now().toString(),
        name: inviteName,
        email: inviteEmail,
        status: "pending"
      }])
      setInviteEmail("")
      setInviteName("")
      setIsInviting(false)
    }
  }

  const handleRemove = (id: string) => {
    setMembers(members.filter(m => m.id !== id))
  }

  return (
    <main className="min-h-screen p-8 relative overflow-hidden">
      <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Team</h1>
            <p className="text-white/60">Manage team members and invitations</p>
          </div>
          <Button onClick={() => setIsInviting(true)} variant="primary">
            <Mail className="h-4 w-4 mr-2" />
            Invite Member
          </Button>
        </div>

        {isInviting && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong rounded-2xl p-6 mb-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Invite Team Member</h3>
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="Full name"
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="email@company.com"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleInvite} variant="primary">Send Invite</Button>
                <Button onClick={() => { setIsInviting(false); setInviteEmail(""); setInviteName("") }} variant="ghost">Cancel</Button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="space-y-4">
          {members.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-strong rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                    <User className="h-6 w-6 text-white/70" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                    <p className="text-white/60 text-sm">{member.email}</p>
                    {member.role && <p className="text-blue-400 text-xs mt-1">Role: {member.role}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs ${member.status === "active" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                    {member.status}
                  </span>
                  <Button onClick={() => handleRemove(member.id)} size="sm" variant="ghost" className="text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
