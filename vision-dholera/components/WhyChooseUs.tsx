import {
  ShieldCheck,
  Landmark,
  BadgeCheck,
  Users,
  Building2,
  Handshake,
} from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <ShieldCheck size={36} />,
      title: "100% Verified Properties",
      description:
        "Every property is carefully verified to ensure secure, transparent, and hassle-free investments.",
    },
    {
      icon: <Landmark size={36} />,
      title: "Government-Backed Smart City",
      description:
        "Invest in India's first Greenfield Smart City with world-class infrastructure and long-term development.",
    },
    {
      icon: <BadgeCheck size={36} />,
      title: "Trusted Real Estate Experts",
      description:
        "Our experienced advisors guide you through every step, from property selection to final registration.",
    },
    {
      icon: <Building2 size={36} />,
      title: "Premium Residential & Commercial Plots",
      description:
        "Choose from carefully selected investment opportunities with exceptional future appreciation potential.",
    },
    {
      icon: <Users size={36} />,
      title: "Customer-Centric Approach",
      description:
        "We focus on building long-term relationships through honesty, transparency, and dedicated support.",
    },
    {
      icon: <Handshake size={36} />,
      title: "End-to-End Assistance",
      description:
        "From site visits and documentation to registration and post-sale support, we're with you at every stage.",
    },
  ];

  return (
    <section
      id="why-choose-us"
      className="relative overflow-hidden bg-white py-24 text-slate-900"
    >
      {/* Decorative Glows */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-100/30 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 z-10">

        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-blue-950 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-amber-400 border border-amber-500/30">
            Why Choose Vision Dholera Estates
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-blue-950 md:text-5xl">
            Your Trusted Partner in{" "}
            <span className="text-amber-500">
              Smart Investments
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-700">
            We believe that every investment should be secure, transparent,
            and profitable. Our mission is to help investors confidently
            own premium properties in Dholera Smart City.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-lg shadow-slate-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-amber-300"
            >
              {/* Gold Accent Top Border */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500" />

              {/* Icon Container - Navy Box with Gold Icon */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-950 text-amber-400 shadow-md border border-blue-900 transition duration-500 group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-blue-950">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="mt-6 text-2xl font-bold text-blue-950">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-4 leading-7 text-slate-600">
                {feature.description}
              </p>

              {/* Bottom Link */}
              
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner (Navy Container with Gold Details) */}
        <div className="mt-20 rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 p-10 md:p-14 text-center text-white shadow-2xl border border-amber-500/20 relative overflow-hidden">
          {/* Subtle Ambient Glow inside CTA */}
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          <h3 className="text-3xl font-bold text-white md:text-4xl">
            Ready to Secure Your Future?
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-slate-300 text-lg leading-relaxed">
            Book a free consultation with our property experts and explore
            the best residential and commercial investment opportunities in
            Dholera Smart City.
          </p>

          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-8 py-4 font-bold text-blue-950 shadow-lg shadow-amber-500/10 transition duration-300 hover:scale-105 hover:brightness-110 active:scale-95"
          >
            📅 Book Now
          </a>
        </div>

      </div>
    </section>
  );
}