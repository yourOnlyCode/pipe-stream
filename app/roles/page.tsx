"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Edit } from "lucide-react"
import { motion } from "framer-motion"

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
}

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([
    { id: "1", name: "Developer", description: "Software development team member", permissions: ["view", "edit"] },
    { id: "2", name: "Manager", description: "Team manager", permissions: ["view", "edit", "approve"] },
    { id: "3", name: "Director", description: "Project director", permissions: ["view", "edit", "approve", "admin"] },
  ])
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: "", description: "", permissions: "" })

  const handleSave = () => {
    if (editingId) {
      setRoles(roles.map(r => r.id === editingId ? { ...r, ...formData, permissions: formData.permissions.split(",").map(p => p.trim()) } : r))
      setEditingId(null)
    } else {
      setRoles([...roles, { id: Date.now().toString(), ...formData, permissions: formData.permissions.split(",").map(p => p.trim()) }])
      setIsAdding(false)
    }
    setFormData({ name: "", description: "", permissions: "" })
  }

  const handleEdit = (role: Role) => {
    setEditingId(role.id)
    setFormData({ name: role.name, description: role.description, permissions: role.permissions.join(", ") })
  }

  const handleDelete = (id: string) => {
    setRoles(roles.filter(r => r.id !== id))
  }

  return (
    <main className="min-h-screen p-8 relative overflow-hidden">
      <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Roles</h1>
            <p className="text-white/60">Manage team roles and permissions</p>
          </div>
          <Button onClick={() => setIsAdding(true)} variant="primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Role
          </Button>
        </div>

        {(isAdding || editingId) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong rounded-2xl p-6 mb-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">{editingId ? "Edit Role" : "New Role"}</h3>
            <div className="space-y-4">
              <div>
                <Label>Role Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Senior Developer"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the role responsibilities"
                />
              </div>
              <div>
                <Label>Permissions (comma-separated)</Label>
                <Input
                  value={formData.permissions}
                  onChange={(e) => setFormData({ ...formData, permissions: e.target.value })}
                  placeholder="e.g. view, edit, approve"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave} variant="primary">Save</Button>
                <Button onClick={() => { setIsAdding(false); setEditingId(null); setFormData({ name: "", description: "", permissions: "" }) }} variant="ghost">Cancel</Button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="space-y-4">
          {roles.map((role) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-strong rounded-2xl p-6"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{role.name}</h3>
                  <p className="text-white/70 mb-3">{role.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {role.permissions.map((perm) => (
                      <span key={perm} className="glass rounded-full px-3 py-1 text-xs text-white/80">
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleEdit(role)} size="sm" variant="ghost">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button onClick={() => handleDelete(role.id)} size="sm" variant="ghost" className="text-red-400">
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
