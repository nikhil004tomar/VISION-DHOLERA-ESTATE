import {
  Building2,
  Plane,
  MapPinned,
  TrendingUp,
} from "lucide-react";

export default function Benefits() {
  const benefits = [
    {
      icon: <Building2 size={36} />,
      title: "Smart City Development",
      description:
        "India's first Greenfield Smart City designed with world-class infrastructure and sustainable urban planning.",
    },
    {
      icon: <Plane size={36} />,
      title: "International Airport",
      description:
        "The upcoming international airport will transform Dholera into a major business and logistics hub.",
    },
    {
      icon: <MapPinned size={36} />,
      title: "Strategic Location",
      description:
        "Excellent connectivity through expressways, freight corridors, metro, and industrial zones.",
    },
    {
      icon: <TrendingUp size={36} />,
      title: "High Investment Growth",
      description:
        "Early investment opportunities with significant appreciation potential and long-term returns.",
    },
  ];

  return (
    <section
      id="benefits"
      className="relative py-24 bg-gradient-to-b from-blue-50 via-white to-slate-50 overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">

          {/* Badge: Navy background with Gold text */}
          <span className="inline-flex items-center rounded-full bg-slate-900 border border-amber-500/30 px-5 py-2 text-sm font-semibold text-amber-400 shadow-sm">
            Premium Investment Opportunity
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-extrabold text-slate-900">
            Why Invest in
            <span className="text-amber-500"> Dholera Smart City?</span>
          </h2>

          <p className="mt-6 text-lg text-slate-600 leading-8">
            Dholera is India's most ambitious smart city project, offering
            world-class infrastructure, government-backed development,
            and exceptional long-term investment potential.
          </p>

        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {benefits.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white/80 backdrop-blur-md p-8 shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-amber-500/40"
            >
              {/* Top Accent Gradient: Gold to Amber */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600"></div>

              {/* Icon Container: Dark Navy background with Gold Icon */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-amber-400 shadow-md transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="mt-6 text-xl font-bold text-slate-900">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-4 leading-7 text-slate-600">
                {item.description}
              </p>

              {/* Learn More link in Gold */}
              <div className="mt-6 flex items-center font-semibold text-amber-600 group-hover:text-amber-500 transition-all group-hover:translate-x-2">
                Learn More →
              </div>

            </div>
          ))}

        </div>

        {/* Bottom Statistics Banner: Deep Navy with Gold & Off-White Details */}
        <div className="mt-20 rounded-3xl bg-slate-900 border border-slate-800 p-10 text-white shadow-2xl relative overflow-hidden">
          
          {/* Subtle inner ambient gold glow */}
          <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-amber-500/10 blur-2xl pointer-events-none"></div>

          <div className="relative grid gap-10 text-center md:grid-cols-4">

            <div>
              <h3 className="text-4xl font-extrabold text-amber-400">920+</h3>
              <p className="mt-2 text-slate-300 font-medium">
                Sq. Km Planned City
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-extrabold text-amber-400">6 Lane</h3>
              <p className="mt-2 text-slate-300 font-medium">
                Expressway Connectivity
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-extrabold text-amber-400">24×7</h3>
              <p className="mt-2 text-slate-300 font-medium">
                Smart Infrastructure
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-extrabold text-amber-400">Future Ready</h3>
              <p className="mt-2 text-slate-300 font-medium">
                Investment Destination
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}