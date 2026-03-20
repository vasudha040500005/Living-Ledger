import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, MapPin, Calendar, Tag } from "lucide-react";

async function getProject(id: string) {
  try {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return null;
    return {
      ...project,
      images: JSON.parse(project.images) as string[],
    };
  } catch {
    return null;
  }
}

async function getRelatedProjects(category: string, excludeId: string) {
  try {
    const projects = await prisma.project.findMany({
      where: { category, id: { not: excludeId } },
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

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  const related = await getRelatedProjects(project.category, project.id);

  return (
    <main>
      <Navbar />

      {/* Hero Image */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <Image
          src={
            project.images[0] ||
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
          }
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-walnut-950/80 via-walnut-950/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-7xl mx-auto">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-cream-300 font-lato text-sm tracking-widest uppercase mb-8 hover:text-cream-100 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="bg-walnut-600 text-cream-50 text-xs px-3 py-1 font-lato tracking-widest uppercase">
              {project.category}
            </span>
            {project.featured && (
              <span className="bg-cream-50 text-walnut-700 text-xs px-3 py-1 font-lato tracking-widest uppercase">
                Featured
              </span>
            )}
          </div>
          <h1 className="font-playfair text-4xl md:text-6xl text-cream-50 mb-4">
            {project.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-cream-400 font-lato text-sm">
            {project.location && (
              <span className="flex items-center gap-2">
                <MapPin size={14} />
                {project.location}
              </span>
            )}
            {project.year && (
              <span className="flex items-center gap-2">
                <Calendar size={14} />
                {project.year}
              </span>
            )}
            <span className="flex items-center gap-2">
              <Tag size={14} />
              {project.category}
            </span>
          </div>
        </div>
      </section>

      {/* Project Content */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <div className="gold-line" />
            <h2 className="font-playfair text-3xl text-walnut-800 mb-6">
              About This Project
            </h2>
            <p className="font-cormorant text-xl text-walnut-600 leading-relaxed whitespace-pre-wrap">
              {project.description}
            </p>
          </div>
          <div className="bg-cream-100 p-8">
            <h3 className="font-lato text-xs tracking-[0.3em] uppercase text-walnut-500 mb-6">
              Project Details
            </h3>
            <dl className="space-y-4">
              <div>
                <dt className="font-lato text-xs text-walnut-400 uppercase tracking-widest mb-1">
                  Category
                </dt>
                <dd className="font-playfair text-walnut-800">
                  {project.category}
                </dd>
              </div>
              {project.location && (
                <div>
                  <dt className="font-lato text-xs text-walnut-400 uppercase tracking-widest mb-1">
                    Location
                  </dt>
                  <dd className="font-playfair text-walnut-800">
                    {project.location}
                  </dd>
                </div>
              )}
              {project.year && (
                <div>
                  <dt className="font-lato text-xs text-walnut-400 uppercase tracking-widest mb-1">
                    Year
                  </dt>
                  <dd className="font-playfair text-walnut-800">
                    {project.year}
                  </dd>
                </div>
              )}
            </dl>
            <div className="mt-8 pt-8 border-t border-cream-200">
              <Link href="/contact" className="btn-primary block text-center">
                Start Your Project
              </Link>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        {project.images.length > 1 && (
          <div className="mt-16">
            <div className="gold-line" />
            <h2 className="font-playfair text-3xl text-walnut-800 mb-8">
              Project Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.map((img, index) => (
                <div key={index} className="relative h-72 overflow-hidden group">
                  <Image
                    src={img}
                    alt={`${project.title} - Image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Related Projects */}
      {related.length > 0 && (
        <section className="bg-cream-100 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="gold-line" />
            <h2 className="font-playfair text-3xl text-walnut-800 mb-12">
              Related Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((p) => (
                <Link key={p.id} href={`/portfolio/${p.id}`} className="group block card-hover">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={p.images[0] || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80"}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="bg-cream-50 p-6">
                    <p className="font-lato text-xs text-walnut-500 uppercase tracking-widest mb-2">
                      {p.category}
                    </p>
                    <h3 className="font-playfair text-lg text-walnut-800 group-hover:text-walnut-600 transition-colors">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
