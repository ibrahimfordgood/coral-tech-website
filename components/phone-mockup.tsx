import { CalendarDays, FileText, GraduationCap, Smartphone } from "lucide-react"

/** A coded (not image) phone showing the kind of school site we build. Light on data, sharp on any screen. */
export function PhoneMockup() {
  return (
    <div
      aria-hidden="true"
      className="w-[200px] rounded-[2.2rem] border-[7px] border-[#0d1118] bg-[#0d1118] shadow-2xl shadow-black/40 sm:w-[230px]"
    >
      <div className="overflow-hidden rounded-[1.7rem] bg-white text-[#1b2230]">
        <div className="flex items-center justify-between bg-[#14325c] px-3 pt-5 pb-3 text-white">
          <span className="flex items-center gap-1.5 text-[10px] font-bold">
            <GraduationCap className="size-3.5" />
            Your School
          </span>
          <span className="flex flex-col gap-[3px]">
            <span className="block h-[2px] w-3 bg-white/80" />
            <span className="block h-[2px] w-3 bg-white/80" />
          </span>
        </div>
        <div className="bg-[#14325c] px-3 pb-4 text-white">
          <p className="text-[9px] tracking-wider text-white/70 uppercase">2026/27 academic year</p>
          <p className="mt-1 text-[15px] leading-tight font-bold">Admissions are open</p>
          <span className="mt-3 inline-block rounded-full bg-accent px-3 py-1 text-[9px] font-bold text-[#1b2230]">Apply online</span>
        </div>
        <div className="space-y-2 p-3">
          {[
            { icon: Smartphone, title: "Pay school fees", sub: "Orange Money · Africell Money" },
            { icon: FileText, title: "Check results", sub: "Enter your pupil PIN" },
            { icon: CalendarDays, title: "Term dates", sub: "Resumes 8 January" },
          ].map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex items-center gap-2 rounded-lg border border-[#e7e2dc] p-2">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-[#fbe9e4] text-[#b6452a]">
                <Icon className="size-3.5" />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] font-bold">{title}</span>
                <span className="block truncate text-[8.5px] text-[#6b7280]">{sub}</span>
              </span>
            </div>
          ))}
        </div>
        <div className="mx-auto mb-2 h-1 w-16 rounded-full bg-[#1b2230]/20" />
      </div>
    </div>
  )
}
