import {
  Building2,
  Plane,
  MapPinned,
  TrendingUp,
} from "lucide-react";

const benefits = [
  {
    icon: Building2,
    title: "Smart City Development",
    description:
      "India's first Greenfield Smart City designed with world-class infrastructure and sustainable urban planning.",
  },
  {
    icon: Plane,
    title: "International Airport",
    description:
      "The upcoming international airport will transform Dholera into a major business and logistics hub.",
  },
  {
    icon: MapPinned,
    title: "Strategic Location",
    description:
      "Excellent connectivity through expressways, freight corridors, metro, and industrial zones.",
  },
  {
    icon: TrendingUp,
    title: "High Investment Growth",
    description:
      "Early investment opportunities with significant appreciation potential and long-term returns.",
  },
];

const stats = [
  { value: "920+", label: "Sq. Km Planned City" },
  { value: "6 Lane", label: "Expressway Connectivity" },
  { value: "24×7", label: "Smart Infrastructure" },
  { value: "Future Ready", label: "Investment Destination" },
];

export default function Benefits() {
  return (
    <section
      id="benefits"
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/80 to-amber-50/20 py-24"
    >
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#06285F]/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#D4A03A]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-[#D4A03A]/40 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#06285F] shadow-sm">
            Premium Investment Opportunity
          </span>

          <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-[#06285F] md:text-5xl">
            Why Invest in
            <span className="text-[#D4A03A]"> Dholera Smart City?</span>
          </h2>

          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#D4A03A]" />

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Dholera is India&apos;s most ambitious smart city project, offering
            world-class infrastructure, government-backed development, and
            exceptional long-term investment potential.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-8 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#D4A03A]/50 hover:shadow-md"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-[#D4A03A]/70 transition group-hover:bg-[#D4A03A]" />

                <span className="text-xs font-semibold tracking-widest text-[#D4A03A]/80">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="mx-auto mt-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#D4A03A]/25 bg-amber-50 text-[#06285F] transition group-hover:border-[#D4A03A]/50 group-hover:bg-amber-100/80">
                  <Icon size={26} strokeWidth={1.75} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-[#06285F]">
                  {item.title}
                </h3>

                <div className="mx-auto mt-3 h-px w-10 bg-[#D4A03A]/40" />

                <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="relative mt-20 overflow-hidden rounded-2xl border border-[#D4A03A]/30 bg-white p-8 shadow-sm md:p-10">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#D4A03A] to-transparent" />

          <div className="grid gap-8 text-center sm:grid-cols-2 md:grid-cols-4 md:gap-0 md:divide-x md:divide-slate-200">
            {stats.map((stat) => (
              <div key={stat.label} className="px-4">
                <h3 className="text-3xl font-extrabold text-[#D4A03A] md:text-4xl">
                  {stat.value}
                </h3>
                <p className="mt-2 text-sm font-medium text-slate-600 md:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
