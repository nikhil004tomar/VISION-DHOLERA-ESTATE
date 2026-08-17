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
      className="relative py-24 bg-gradient-to-b from-slate-50 via-white to-amber-50/10 overflow-hidden"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-yellow-200/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-200/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex px-4 py-2 rounded-full bg-amber-50 text-amber-700 border border-amber-300 font-semibold text-sm shadow-sm">
            About Vision Dholera Estate
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Building Your Future Through
            <span className="text-amber-500"> Smart Investments</span>
          </h2>

          <p className="mt-6 text-lg text-slate-600 leading-8">
            We help investors discover premium residential and commercial
            opportunities in Dholera Smart City, combining market expertise,
            transparency, and personalized guidance to help you invest with
            confidence.
          </p>
        </div>

        {/* Main Section */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Image & Floating Navy Badge */}
          <div className="relative">
            <div className="relative p-1.5 rounded-3xl bg-gradient-to-tr from-amber-400 via-amber-200 to-indigo-950 shadow-2xl">
              <img
                src="/about.png"
                alt="Vision Dholera Estate"
                className="rounded-2xl w-full object-cover"
              />
            </div>

            {/* Deep Navy Floating Badge with Bright Gold Accent */}
            <div className="absolute -bottom-6 left-6 bg-slate-900 border-2 border-amber-400/80 rounded-2xl shadow-2xl px-6 py-5">
              <p className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                Helping Investors Build Wealth
              </p>
              <h3 className="text-2xl font-bold text-white mt-0.5">
                Trusted Property Advisors
              </h3>
            </div>
          </div>

          {/* Features Column */}
          <div>
            <h3 className="text-3xl font-bold text-slate-900">
              Why Choose Vision Dholera Estate?
            </h3>

            <p className="mt-5 text-slate-600 leading-8">
              Our mission is to connect investors with premium opportunities in
              Dholera Smart City. From selecting the right plot to completing
              the purchase process, we provide honest advice and professional
              support at every step.
            </p>

            {/* Feature Cards Grid */}
            <div className="grid sm:grid-cols-2 gap-5 mt-10">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-amber-400 hover:-translate-y-1 transition duration-300"
                >
                  <div className="text-3xl mb-3 p-3 w-fit rounded-xl bg-amber-50 border border-amber-200/80">
                    {feature.icon}
                  </div>

                  <h4 className="font-bold text-lg text-slate-900">
                    {feature.title}
                  </h4>

                  <p className="mt-2 text-slate-600 text-sm leading-6">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Bright Gold CTA Button */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/#contact"
                className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-amber-400/30 hover:brightness-105 transition duration-200"
              >
                📞 Book Now
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}