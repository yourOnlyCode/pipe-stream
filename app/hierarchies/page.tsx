import { HierarchyBuilder } from "@/components/hierarchy-builder"

export default function HierarchiesPage() {
  return (
    <main className="min-h-screen p-8 relative overflow-hidden">
      <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <HierarchyBuilder />
      </div>
    </main>
  )
}
