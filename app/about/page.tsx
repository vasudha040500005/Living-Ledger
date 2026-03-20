import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Award, Users, Lightbulb, Heart } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Passion-Driven",
      desc: "Every project is approached with genuine love for design and a deep commitment to exceeding expectations.",
    },
    {
      icon: Lightbulb,
      title: "Innovative Thinking",
      desc: "We blend traditional craftsmanship with contemporary design trends to create timeless yet modern spaces.",
    },
    {
      icon: Users,
      title: "Client-Centric",
      desc: "Your vision, lifestyle, and personality guide every decision. We create spaces uniquely tailored to you.",
    },
    {
      icon: Award,
      title: "Uncompromising Quality",
      desc: "From materials to finishing touches, we never compromise on quality. Excellence is our standard.",
    },
  ];

  const milestones = [
    { year: "2018", event: "Founded De`Sign in Bangalore" },
    { year: "2019", event: "First commercial project — a luxury restaurant in Indiranagar" },
    { year: "2020", event: "Completed our 10th project milestone" },
    { year: "2021", event: "Expanded to serve clients across South India" },
    { year: "2023", event: "Completed our 10th project milestone" },
    { year: "2024", event: "Launched sustainable design initiatives across all projects" },
    { year: "2025", event: "Launched sustainable design initiatives across all projects" },
  ];

  return (
    <main>
      <Navbar />

      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1920&q=80"
          alt="About Us"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-walnut-950/65" />
        <div className="relative z-10 text-center">
          <p className="font-lato text-xs tracking-[0.4em] uppercase text-walnut-300 mb-4">
            Our Story
          </p>
          <h1 className="font-playfair text-5xl md:text-6xl text-cream-50">
            About Us
          </h1>
          <div className="w-16 h-0.5 bg-walnut-400 mx-auto mt-6" />
        </div>
      </section>

      {/* Main Story */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <p className="font-lato text-xs tracking-[0.3em] uppercase text-walnut-500 mb-4">
            Meet the Designer
          </p>
          <div className="gold-line" />
          <h2 className="font-playfair text-4xl text-walnut-800 mb-6">
            Ganesh V Mestha — Founder &
            <br />
            <span className="italic">Principal Designer</span>
          </h2>
          <p className="font-cormorant text-xl text-walnut-600 leading-relaxed mb-8">
            With over half a decade of experience transforming spaces across Karnataka,
            Ganesh V Mestha brings an unparalleled eye for detail and a deep
            understanding of how spaces shape human experience.
          </p>
          <p className="font-cormorant text-sm text-walnut-600 leading-relaxed mb-8">
            The philosophy is simple: great design
            emerges from listening deeply and translating dreams into
            breathtaking reality.
          </p>
          <p className="font-cormorant text-sm text-walnut-600 leading-relaxed mb-8">
            Each project is approached as a unique story waiting to be told —
            through textures, colors, light, and the perfect arrangement of
            space. The result is always an interior that feels both
            professionally designed and deeply personal.
          </p>
          <Link href="/contact" className="btn-primary inline-block">
            Work With Us
          </Link>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-cream-100 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-lato text-xs tracking-[0.3em] uppercase text-walnut-500 mb-4">
              What Drives Us
            </p>
            <div className="gold-line mx-auto" />
            <h2 className="section-title">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-cream-50 p-8 text-center card-hover">
                <div className="w-14 h-14 bg-walnut-100 flex items-center justify-center mx-auto mb-6">
                  <value.icon size={24} className="text-walnut-700" />
                </div>
                <h3 className="font-playfair text-xl text-walnut-800 mb-3">
                  {value.title}
                </h3>
                <p className="font-lato text-sm text-walnut-600 leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-lato text-xs tracking-[0.3em] uppercase text-walnut-500 mb-4">
            Our Journey
          </p>
          <div className="gold-line mx-auto" />
          <h2 className="section-title">7 Years of Excellence</h2>
        </div>
        <div className="max-w-3xl mx-auto">
          {milestones.map((milestone, index) => (
            <div key={milestone.year} className="flex gap-8 mb-8 last:mb-0">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-walnut-700 flex items-center justify-center flex-shrink-0">
                  <span className="font-lato text-xs text-cream-50 font-bold">
                    {milestone.year.slice(2)}
                  </span>
                </div>
                {index < milestones.length - 1 && (
                  <div className="w-px flex-1 bg-walnut-200 mt-2" />
                )}
              </div>
              <div className="pb-8">
                <p className="font-playfair text-xl text-walnut-700 mb-1">
                  {milestone.year}
                </p>
                <p className="font-lato text-sm text-walnut-600">
                  {milestone.event}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-walnut-900 py-24 relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1920&q=60"
          alt="Design process"
          fill
          className="object-cover opacity-10"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-lato text-xs tracking-[0.3em] uppercase text-walnut-400 mb-4">
              How We Work
            </p>
            <div className="gold-line mx-auto" />
            <h2 className="font-playfair text-4xl text-cream-50">
              Our Design Process
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "We begin with deep conversations to understand your vision, lifestyle, and aspirations for the space." },
              { step: "02", title: "Concept", desc: "Our team develops mood boards, 3D renders, and material palettes to visualize the design direction." },
              { step: "03", title: "Design", desc: "Detailed drawings, material specifications, and vendor coordination to bring the concept to life." },
              { step: "04", title: "Execution", desc: "Hands-on supervision of every installation, ensuring the final space matches the design vision perfectly." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <p className="font-playfair text-5xl text-walnut-600 mb-4">
                  {item.step}
                </p>
                <h3 className="font-playfair text-xl text-cream-100 mb-3">
                  {item.title}
                </h3>
                <p className="font-lato text-sm text-walnut-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
