"use client"

export function SummaryCard({ summary }: { summary: string }) {
  return (
    <div className="bg-gradient-to-br from-ochre-50 to-cream-100 rounded-xl border border-ochre-200 shadow-md p-6 md:p-8">
      <p className="text-base md:text-lg text-foreground/90 leading-relaxed text-pretty">{summary}</p>
    </div>
  )
}
