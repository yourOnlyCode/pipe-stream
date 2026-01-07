"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Plus, Trash2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface HierarchyNode {
  id: string
  name: string
  email: string
  role?: string
  children: HierarchyNode[]
}

interface NodeProps {
  node: HierarchyNode
  onAddChild: (parentId: string, member?: TeamMember) => void
  onAddPeer: (nodeId: string, member?: TeamMember) => void
  onRemove: (id: string) => void
  onUpdate: (id: string, data: Partial<HierarchyNode>) => void
  teamMembers: TeamMember[]
  usedEmails: Set<string>
}

interface TeamMember {
  id: string
  name: string
  email: string
  role?: string
}

function HierarchyNodeComponent({ node, onAddChild, onAddPeer, onRemove, onUpdate, teamMembers, usedEmails }: NodeProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [isPeerPopoverOpen, setIsPeerPopoverOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(node.name)
  const [email, setEmail] = useState(node.email)
  const [role, setRole] = useState(node.role || "")

  const availableRoles = ["Developer", "Manager", "Director", "Designer", "QA Engineer"]

  const handleSave = () => {
    onUpdate(node.id, { name, email, role })
    setIsEditing(false)
  }

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative group"
      >
        <div className="glass-strong rounded-xl p-4 pb-12 min-w-[240px] hover:glow transition-all relative">
          {isEditing ? (
            <div className="space-y-2">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="h-8 text-sm"
              />
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="h-8 text-sm"
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="h-8 text-sm rounded-md glass border border-white/20 px-2 text-white"
              >
                <option value="">Select Role</option>
                {availableRoles.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <div className="flex gap-2">
                <Button onClick={handleSave} size="sm" variant="primary" className="flex-1">
                  Save
                </Button>
                <Button onClick={() => setIsEditing(false)} size="sm" variant="ghost" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
                  <User className="h-5 w-5 text-white/70" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white text-sm">{node.name}</div>
                  <div className="text-xs text-white/60">{node.email}</div>
                  {node.role && <div className="text-xs text-blue-400 mt-1">Role: {node.role}</div>}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1 opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-2 left-2 right-2">
                <Button
                  onClick={() => setIsEditing(true)}
                  size="sm"
                  variant="ghost"
                  className="h-8 text-xs"
                >
                  Edit
                </Button>
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 text-xs"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="text-sm font-semibold text-white mb-3">Select Team Member</div>
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      <button
                        onClick={() => {
                          onAddChild(node.id)
                          setIsPopoverOpen(false)
                        }}
                        className="w-full glass rounded-lg p-3 hover:glass-strong transition-all text-left"
                      >
                        <div className="font-medium text-white text-sm">Unassigned</div>
                        <div className="text-xs text-white/60">Create empty node</div>
                      </button>
                      {teamMembers.map((member) => {
                        const isDisabled = usedEmails.has(member.email)
                        return (
                          <button
                            key={member.id}
                            onClick={() => {
                              if (!isDisabled) {
                                onAddChild(node.id, member)
                                setIsPopoverOpen(false)
                              }
                            }}
                            className={`w-full glass rounded-lg p-3 hover:glass-strong transition-all text-left ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isDisabled}
                          >
                            <div className="font-medium text-white text-sm">{member.name}</div>
                            <div className="text-xs text-white/60">{member.email}</div>
                            {member.role && <div className="text-xs text-blue-400 mt-1">{member.role}</div>}
                            {isDisabled && <div className="text-xs text-red-400 mt-1">Already in hierarchy</div>}
                          </button>
                        )
                      })}
                    </div>
                  </PopoverContent>
                </Popover>
                <Popover open={isPeerPopoverOpen} onOpenChange={setIsPeerPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 text-xs"
                    >
                      Peer
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="text-sm font-semibold text-white mb-3">Select Team Member</div>
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      <button
                        onClick={() => {
                          onAddPeer(node.id)
                          setIsPeerPopoverOpen(false)
                        }}
                        className="w-full glass rounded-lg p-3 hover:glass-strong transition-all text-left"
                      >
                        <div className="font-medium text-white text-sm">Unassigned</div>
                        <div className="text-xs text-white/60">Create empty node</div>
                      </button>
                      {teamMembers.map((member) => {
                        const isDisabled = usedEmails.has(member.email)
                        return (
                          <button
                            key={member.id}
                            onClick={() => {
                              if (!isDisabled) {
                                onAddPeer(node.id, member)
                                setIsPeerPopoverOpen(false)
                              }
                            }}
                            className={`w-full glass rounded-lg p-3 hover:glass-strong transition-all text-left ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isDisabled}
                          >
                            <div className="font-medium text-white text-sm">{member.name}</div>
                            <div className="text-xs text-white/60">{member.email}</div>
                            {member.role && <div className="text-xs text-blue-400 mt-1">{member.role}</div>}
                            {isDisabled && <div className="text-xs text-red-400 mt-1">Already in hierarchy</div>}
                          </button>
                        )
                      })}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <Button
                onClick={() => onRemove(node.id)}
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 text-red-400 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </>
          )}
        </div>

        {node.children.length > 0 && (
          <div className="absolute left-1/2 -translate-x-1/2 top-full">
            <div className="w-0.5 h-8 bg-gradient-to-b from-blue-400 to-transparent" />
          </div>
        )}
      </motion.div>

      {node.children.length > 0 && (
        <div className="flex gap-6 mt-8 relative">
          {node.children.map((child, idx, arr) => {
            return (
              <div key={child.id} className="relative">
                {idx > 0 && (
                  <div className="absolute right-full top-[60px] w-6 h-0.5 bg-blue-400" />
                )}
                <HierarchyNodeComponent
                  node={child}
                  onAddChild={onAddChild}
                  onAddPeer={onAddPeer}
                  onRemove={onRemove}
                  onUpdate={onUpdate}
                  teamMembers={teamMembers}
                  usedEmails={usedEmails}
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function HierarchyBuilder() {
  const [teamMembers] = useState<TeamMember[]>([
    { id: "1", name: "Alice Chen", email: "alice@company.com", role: "Director" },
    { id: "2", name: "Bob Smith", email: "bob@company.com", role: "Manager" },
    { id: "3", name: "Carol Davis", email: "carol@company.com", role: "Developer" },
  ])
  const [isRootPopoverOpen, setIsRootPopoverOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hierarchy, setHierarchy] = useState<HierarchyNode[]>([
    {
      id: "1",
      name: "Director",
      email: "director@company.com",
      children: [],
    },
  ])

  const getUsedEmails = (nodes: HierarchyNode[]): Set<string> => {
    const emails = new Set<string>()
    const traverse = (nodes: HierarchyNode[]) => {
      nodes.forEach(node => {
        if (node.email !== "unassigned@company.com") {
          emails.add(node.email)
        }
        traverse(node.children)
      })
    }
    traverse(nodes)
    return emails
  }

  const usedEmails = useMemo(() => getUsedEmails(hierarchy), [hierarchy])

  const isEmailInHierarchy = (nodes: HierarchyNode[], email: string): boolean => {
    for (const node of nodes) {
      if (node.email === email) return true
      if (isEmailInHierarchy(node.children, email)) return true
    }
    return false
  }

  const findAndUpdate = (
    nodes: HierarchyNode[],
    id: string,
    updater: (node: HierarchyNode) => HierarchyNode
  ): HierarchyNode[] => {
    return nodes.map((node) => {
      if (node.id === id) {
        return updater(node)
      }
      return {
        ...node,
        children: findAndUpdate(node.children, id, updater),
      }
    })
  }

  const findAndRemove = (nodes: HierarchyNode[], id: string): HierarchyNode[] => {
    return nodes
      .filter((node) => node.id !== id)
      .map((node) => ({
        ...node,
        children: findAndRemove(node.children, id),
      }))
  }

  const addPeer = (nodeId: string, member?: TeamMember) => {
    if (member && isEmailInHierarchy(hierarchy, member.email)) {
      setError(`${member.name} is already in this hierarchy`)
      setTimeout(() => setError(null), 3000)
      return
    }
    const newNode: HierarchyNode = member ? {
      id: Date.now().toString(),
      name: member.name,
      email: member.email,
      role: member.role,
      children: [],
    } : {
      id: Date.now().toString(),
      name: "Unassigned",
      email: "unassigned@company.com",
      children: [],
    }

    const addPeerToParent = (nodes: HierarchyNode[], targetId: string): HierarchyNode[] => {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === targetId) {
          return [...nodes.slice(0, i + 1), newNode, ...nodes.slice(i + 1)]
        }
        const updatedChildren = addPeerToParent(nodes[i].children, targetId)
        if (updatedChildren !== nodes[i].children) {
          return nodes.map((node, idx) =>
            idx === i ? { ...node, children: updatedChildren } : node
          )
        }
      }
      return nodes
    }

    setHierarchy((prev) => addPeerToParent(prev, nodeId))
  }

  const addChild = (parentId: string, member?: TeamMember) => {
    if (member && isEmailInHierarchy(hierarchy, member.email)) {
      setError(`${member.name} is already in this hierarchy`)
      setTimeout(() => setError(null), 3000)
      return
    }
    const newNode: HierarchyNode = member ? {
      id: Date.now().toString(),
      name: member.name,
      email: member.email,
      role: member.role,
      children: [],
    } : {
      id: Date.now().toString(),
      name: "Unassigned",
      email: "unassigned@company.com",
      children: [],
    }

    setHierarchy((prev) =>
      findAndUpdate(prev, parentId, (node) => ({
        ...node,
        children: [...node.children, newNode],
      }))
    )
  }

  const removeNode = (id: string) => {
    setHierarchy((prev) => findAndRemove(prev, id))
  }

  const updateNode = (id: string, data: Partial<HierarchyNode>) => {
    setHierarchy((prev) =>
      findAndUpdate(prev, id, (node) => ({
        ...node,
        ...data,
      }))
    )
  }

  const addRootNode = () => {
    // This will be replaced with dialog selection
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="glass-strong rounded-xl p-4 border border-red-400 text-red-400 text-center">
          {error}
        </div>
      )}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-white">Hierarchy Builder</h2>
          <p className="text-white/60 text-sm">Build your team structure</p>
        </div>
        <div className="flex gap-3">
          <Popover open={isRootPopoverOpen} onOpenChange={setIsRootPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost">
                <Plus className="h-4 w-4 mr-2" />
                Add Root Node
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="text-sm font-semibold text-white mb-3">Select Team Member</div>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                <button
                  onClick={() => {
                    const newNode: HierarchyNode = {
                      id: Date.now().toString(),
                      name: "Unassigned",
                      email: "unassigned@company.com",
                      children: [],
                    }
                    setHierarchy((prev) => [...prev, newNode])
                    setIsRootPopoverOpen(false)
                  }}
                  className="w-full glass rounded-lg p-3 hover:glass-strong transition-all text-left"
                >
                  <div className="font-medium text-white text-sm">Unassigned</div>
                  <div className="text-xs text-white/60">Create empty node</div>
                </button>
                {teamMembers.map((member) => {
                  const isDisabled = isEmailInHierarchy(hierarchy, member.email)
                  return (
                    <button
                      key={member.id}
                      onClick={() => {
                        if (isDisabled) {
                          setError(`${member.name} is already in this hierarchy`)
                          setTimeout(() => setError(null), 3000)
                          return
                        }
                        const newNode: HierarchyNode = {
                          id: Date.now().toString(),
                          name: member.name,
                          email: member.email,
                          role: member.role,
                          children: [],
                        }
                        setHierarchy((prev) => [...prev, newNode])
                        setIsRootPopoverOpen(false)
                      }}
                      className={`w-full glass rounded-lg p-3 hover:glass-strong transition-all text-left ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={isDisabled}
                    >
                      <div className="font-medium text-white text-sm">{member.name}</div>
                      <div className="text-xs text-white/60">{member.email}</div>
                      {member.role && <div className="text-xs text-blue-400 mt-1">{member.role}</div>}
                      {isDisabled && <div className="text-xs text-red-400 mt-1">Already in hierarchy</div>}
                    </button>
                  )
                })}
              </div>
            </PopoverContent>
          </Popover>
          <Button variant="primary">Save Hierarchy</Button>
        </div>
      </div>

      <div className="glass rounded-3xl p-8 overflow-x-auto">
        <div className="flex justify-center min-w-max">
          <div className="flex gap-8">
            {hierarchy.map((node) => (
              <HierarchyNodeComponent
                key={node.id}
                node={node}
                onAddChild={addChild}
                onAddPeer={addPeer}
                onRemove={removeNode}
                onUpdate={updateNode}
                teamMembers={teamMembers}
                usedEmails={usedEmails}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
