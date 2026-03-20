import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { prisma } from "@/lib/prisma";
import { ArrowRight, Award, Clock, Home, Star } from "lucide-react";

async function getFeaturedProjects() {
  try {
    const projects = await prisma.project.findMany({
      where: { featured: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    });
    return projects.map((p) => ({
      ...p,
      images: JSON.parse(p.images) as string[],
    }));
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  const stats = [
    { icon: Home, value: "10+", label: "Projects Completed" },
    { icon: Clock, value: "7+", label: "Years Experience" },
    { icon: Star, value: "98%", label: "Client Satisfaction" },
  ];

  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=90"
          alt="Luxury interior design"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-walnut-950/80 via-walnut-950/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <p className="font-lato text-xs tracking-[0.4em] uppercase text-cream-300 mb-6 animate-fade-in">
              Premium Interior Design Studio
            </p>
            <h1 className="font-playfair text-5xl md:text-7xl text-cream-50 leading-tight mb-6 text-shadow-lg animate-slide-up">
              Spaces That
              <br />
              <span className="italic text-walnut-300">Inspire</span> Living
            </h1>
            <p className="font-cormorant text-xl md:text-2xl text-cream-300 leading-relaxed mb-10 max-w-lg">
              We transform ordinary spaces into extraordinary experiences —
              blending timeless elegance with modern functionality.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/portfolio"
                className="btn-primary inline-flex items-center gap-2"
              >
                View Our Work
                <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn-outline">
                Start a Project
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-cream-400 text-xs tracking-widest uppercase font-lato">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-cream-400 to-transparent animate-pulse" />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-walnut-800 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="mx-auto mb-3 text-walnut-300" size={28} />
              <p className="font-playfair text-3xl text-cream-100 mb-1">
                {stat.value}
              </p>
              <p className="font-lato text-xs tracking-widest uppercase text-walnut-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-lato text-xs tracking-[0.3em] uppercase text-walnut-500 mb-4">
              About the Studio
            </p>
            <div className="gold-line" />
            <h2 className="section-title">
              Where Vision Meets
              <br />
              <span className="italic">Craftsmanship</span>
            </h2>
            <p className="font-cormorant text-xl text-walnut-600 leading-relaxed mb-6">
              Based in Bangalore, De`Sign has been shaping spaces that
              evoke emotion since 2018. Our approach blends traditional Indian
              craftsmanship with contemporary design principles.
            </p>
            <p className="font-lato text-sm text-walnut-600 leading-relaxed mb-8">
              Every project is a collaboration — we listen, we understand, and
              we create spaces that are uniquely yours. From concept to
              completion, we ensure every detail speaks volumes.
            </p>
            <Link href="/about" className="btn-outline inline-block">
              Our Story
            </Link>
          </div>
          <div className="relative">
            <div className="relative h-[500px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800&q=80"
                alt="Designer at work"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-walnut-800 p-6 max-w-[200px]">
              <p className="font-playfair text-4xl text-cream-50">7+</p>
              <p className="font-lato text-xs tracking-widest uppercase text-walnut-300">
                Years of Excellence
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-cream-100 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-lato text-xs tracking-[0.3em] uppercase text-walnut-500 mb-4">
              What We Do
            </p>
            <div className="gold-line mx-auto" />
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">
              End-to-end interior design solutions tailored to your lifestyle
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                img: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=80",
                title: "Residential Design",
                desc: "Transform your home into a haven that reflects your personality and meets every need of your family.",
              },
              {
                img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
                title: "Commercial Spaces",
                desc: "Create workplaces and retail environments that inspire productivity and leave lasting impressions.",
              },
              {
                img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
                title: "Furniture & Styling",
                desc: "Curated furniture selection and complete styling services to bring your space to its full potential.",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="group bg-cream-50 overflow-hidden card-hover"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-playfair text-xl text-walnut-800 mb-3">
                    {service.title}
                  </h3>
                  <p className="font-lato text-sm text-walnut-600 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="font-lato text-xs tracking-[0.3em] uppercase text-walnut-500 mb-4">
                Our Work
              </p>
              <div className="gold-line" />
              <h2 className="section-title mb-0">Featured Projects</h2>
            </div>
            <Link
              href="/portfolio"
              className="hidden md:flex items-center gap-2 font-lato text-sm tracking-widest uppercase text-walnut-600 hover:text-walnut-800 transition-colors"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                category={project.category}
                location={project.location}
                year={project.year}
                images={project.images}
                featured={project.featured}
              />
            ))}
          </div>
          <div className="text-center mt-10 md:hidden">
            <Link href="/portfolio" className="btn-outline inline-block">
              View All Projects
            </Link>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="bg-walnut-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <Image
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=60"
            alt="background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-lato text-xs tracking-[0.3em] uppercase text-walnut-400 mb-4">
              Client Stories
            </p>
            <div className="gold-line mx-auto" />
            <h2 className="font-playfair text-4xl text-cream-50">
              What Our Clients Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya & Arjun Sharma",
                project: "Residential Villa, Whitefield",
                text: "De`Signcompletely transformed our 4BHK into a dream home. The attention to detail and understanding of our lifestyle was exceptional. Every room tells our story.",
              },
              {
                name: "Rohit Mehta",
                project: "Corporate Office, MG Road",
                text: "The office space redesign boosted our team's morale significantly. The blend of functionality and aesthetics was perfectly achieved. Highly recommend!",
              },
              {
                name: "Kavitha Nair",
                project: "Restaurant, Indiranagar",
                text: "Our restaurant ambience is exactly what we envisioned — warm, inviting, and uniquely ours. Bookings increased 40% after the renovation!",
              },
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-walnut-800/50 p-8 border border-walnut-700"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-walnut-400 text-walnut-400"
                    />
                  ))}
                </div>
                <p className="font-cormorant text-lg text-cream-300 leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="border-t border-walnut-700 pt-4">
                  <p className="font-lato text-sm text-cream-200 font-medium">
                    {testimonial.name}
                  </p>
                  <p className="font-lato text-xs text-walnut-400">
                    {testimonial.project}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1920&q=80"
          alt="Interior design inspiration"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-walnut-950/70" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <p className="font-lato text-xs tracking-[0.4em] uppercase text-walnut-300 mb-6">
            Ready to Begin?
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-cream-50 mb-6">
            Let&apos;s Create Something
            <br />
            <span className="italic text-walnut-300">Beautiful Together</span>
          </h2>
          <p className="font-cormorant text-xl text-cream-300 mb-10">
            Your dream space is just a conversation away.
          </p>
          <Link href="/contact" className="btn-primary inline-block">
            Schedule a Consultation
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
