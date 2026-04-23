import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: "Lawn Mowing",
    desc: "Precise, consistent cuts that keep your lawn looking its best all season long. We adjust cut height to suit your grass type.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
      </svg>
    ),
    title: "Edging",
    desc: "Crisp, clean edges along driveways, sidewalks, and garden beds to give your yard that polished, professional finish.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Leaf Blowing",
    desc: "Quick, thorough clearing of leaves, clippings, and debris from your lawn, driveway, and walkways after every visit.",
  },
];

const trustPoints = [
  { icon: "🛡️", text: "Licensed & insured for your peace of mind" },
  { icon: "📅", text: "Reliable scheduling — we show up when we say we will" },
  { icon: "🏡", text: "Local crew that cares about our community" },
  { icon: "💬", text: "Easy communication — reach us anytime by phone or email" },
];

const serviceAreas = [
  "[PLACEHOLDER: Town 1]",
  "[PLACEHOLDER: Town 2]",
  "[PLACEHOLDER: Town 3]",
  "[PLACEHOLDER: Town 4]",
  "[PLACEHOLDER: Town 5]",
  "[PLACEHOLDER: Town 6]",
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#2D6A4F] via-[#40916c] to-[#52B788] text-white overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 text-center">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
            Professional Lawn Care
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Your Lawn, Looking Its<br />
            <span className="text-[#d8f3dc]">Absolute Best</span>
          </h1>
          <p className="text-lg sm:text-xl text-green-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            GreenCut Lawn Services provides reliable residential mowing, edging, and leaf blowing.
            Local, friendly, and always on time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="bg-white text-[#2D6A4F] font-bold px-8 py-4 rounded-xl text-base hover:bg-green-50 transition-colors shadow-lg"
            >
              Book Now
            </Link>
            <Link
              href="/quote"
              className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl text-base hover:bg-white/10 transition-colors"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What We Do</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Three core services — done right, every time.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s) => (
              <div
                key={s.title}
                className="bg-[#f8fbf9] rounded-2xl p-8 border border-[#e8f5ee] hover:shadow-md transition-shadow group"
              >
                <div className="text-[#2D6A4F] mb-5 group-hover:scale-110 transition-transform inline-block">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/book"
              className="bg-[#2D6A4F] text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-[#245c43] transition-colors inline-block"
            >
              Schedule a Service
            </Link>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section id="area" className="py-20 bg-[#f0faf5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Service Area</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              We currently serve the following towns and surrounding areas.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {serviceAreas.map((area) => (
              <span
                key={area}
                className="bg-white border border-[#52B788] text-[#2D6A4F] font-medium px-5 py-2 rounded-full text-sm shadow-sm"
              >
                {area}
              </span>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm">
            Don&apos;t see your town?{" "}
            <a href="#contact" className="text-[#2D6A4F] font-medium hover:underline">
              Contact us!
            </a>{" "}
            We may still be able to help.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Why Homeowners Choose GreenCut
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                We&apos;re not a faceless franchise — we&apos;re your neighbors. Our crew takes
                pride in every yard we maintain and builds lasting relationships with our customers.
              </p>
              <ul className="space-y-5">
                {trustPoints.map((t) => (
                  <li key={t.text} className="flex items-start gap-4">
                    <span className="text-2xl mt-0.5">{t.icon}</span>
                    <span className="text-gray-700 text-sm leading-relaxed">{t.text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Link
                  href="/quote"
                  className="border-2 border-[#2D6A4F] text-[#2D6A4F] font-semibold px-6 py-3 rounded-xl hover:bg-[#f0faf5] transition-colors text-sm inline-block"
                >
                  Get a Free Quote
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="relative w-72 h-72">
                <div className="absolute inset-0 bg-gradient-to-br from-[#52B788] to-[#2D6A4F] rounded-full opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center text-9xl">🌿</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#2D6A4F] py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready for a Greener Lawn?</h2>
          <p className="text-green-200 mb-8">
            Book an appointment online in minutes — no account required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="bg-white text-[#2D6A4F] font-bold px-8 py-3.5 rounded-xl hover:bg-green-50 transition-colors"
            >
              Book Now
            </Link>
            <Link
              href="/quote"
              className="border-2 border-white text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors"
            >
              Get a Quote First
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
