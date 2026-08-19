import Link from "next/link";

export default function About() {
  const features = [
    {
      title: "Government Backed",
      description:
        "Dholera Smart City is supported by the Government of India with world-class infrastructure and long-term development plans.",
      icon: "🏛️",
    },
    {
      title: "Prime Investment",
      description:
        "Residential and commercial plots with excellent growth potential in one of India's fastest-developing smart cities.",
      icon: "📈",
    },
    {
      title: "Modern Infrastructure",
      description:
        "Wide roads, metro connectivity, international airport, and sustainable urban planning for future-ready living.",
      icon: "🏙️",
    },
    {
      title: "Trusted Guidance",
      description:
        "Our experienced team helps you choose the right property with complete transparency and professional support.",
      icon: "🤝",
    },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-amber-50/10 py-24"
    >
      {/* Subtle Background Glows */}
      <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-yellow-200/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-slate-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Header Section */}
        <div className="mx-auto mb-16 max-w-3xl text-center">

          <span className="inline-flex items-center rounded-full border border-amber-300/80 bg-amber-50 px-5 py-2 text-sm font-semibold tracking-wide text-amber-700 shadow-sm">
            About Vision Dholera Estate
          </span>

          <h2 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">
            Building Your Future Through
            <span className="relative ml-2 inline-block text-amber-500">
              Smart Investments
              <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-amber-400/30" />
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            We help investors discover premium residential and commercial
            opportunities in Dholera Smart City, combining market expertise,
            transparency, and personalized guidance to help you invest with
            confidence.
          </p>

        </div>


        {/* Main Section */}
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">

          {/* Image Section */}
          <div className="relative">

            <div className="absolute -inset-3 rounded-[2rem] bg-amber-400/10 blur-xl" />

            <div className="relative rounded-[2rem] bg-gradient-to-br from-amber-400 via-amber-200 to-slate-900 p-1.5 shadow-2xl">

              <div className="overflow-hidden rounded-[1.65rem] bg-white">

                <img
                  src="/about.png"
                  alt="Vision Dholera Estate"
                  className="block w-full object-cover transition duration-700 hover:scale-[1.02]"
                />

              </div>

            </div>


            {/* Floating Badge */}
            <div className="absolute -bottom-7 left-5 rounded-2xl border border-amber-400/70 bg-slate-900 px-6 py-5 shadow-2xl shadow-slate-900/20 md:left-8">

              <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-amber-400" />

              <p className="pl-2 text-[11px] font-bold uppercase tracking-[0.16em] text-amber-400">
                Helping Investors Build Wealth
              </p>

              <h3 className="mt-1 pl-2 text-xl font-bold tracking-tight text-white md:text-2xl">
                Trusted Property Advisors
              </h3>

            </div>

          </div>


          {/* Features Column */}
          <div>

            <h3 className="text-3xl font-bold tracking-tight text-slate-900 md:text-[2rem]">
              Why Choose Vision Dholera Estate?
            </h3>

            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300" />

            <p className="mt-6 leading-8 text-slate-600">
              Our mission is to connect investors with premium opportunities in
              Dholera Smart City. From selecting the right plot to completing
              the purchase process, we provide honest advice and professional
              support at every step.
            </p>


            {/* Feature Cards */}
            <div className="mt-10 grid gap-5 sm:grid-cols-2">

              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-300 hover:shadow-xl hover:shadow-slate-200/60"
                >

                  {/* Hover Accent */}
                  <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-amber-400 to-yellow-400 transition-all duration-300 group-hover:w-full" />

                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-amber-200/80 bg-amber-50 text-3xl shadow-sm transition-transform duration-300 group-hover:scale-105">
                    {feature.icon}
                  </div>

                  <h4 className="text-lg font-bold text-slate-900">
                    {feature.title}
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {feature.description}
                  </p>

                </div>
              ))}

            </div>


            {/* CTA */}
            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href="/#contact"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 px-8 py-3.5 font-bold text-slate-950 shadow-lg shadow-amber-400/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-400/30"
              >
                <span>📞</span>
                <span>Book Now</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}