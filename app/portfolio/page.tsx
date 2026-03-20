import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { prisma } from "@/lib/prisma";

const CATEGORIES = [
  "All",
  "Residential",
  "Commercial",
  "Hospitality",
  "Retail",
  "Office",
];

async function getAllProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });
    return projects.map((p) => ({
      ...p,
      images: JSON.parse(p.images) as string[],
    }));
  } catch {
    return [];
  }
}

export default async function PortfolioPage() {
  const projects = await getAllProjects();

  return (
    <main>
      <Navbar />

      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&q=80"
          alt="Portfolio"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-walnut-950/60" />
        <div className="relative z-10 text-center">
          <p className="font-lato text-xs tracking-[0.4em] uppercase text-walnut-300 mb-4">
            Our Work
          </p>
          <h1 className="font-playfair text-5xl md:text-6xl text-cream-50">
            Portfolio
          </h1>
          <div className="w-16 h-0.5 bg-walnut-400 mx-auto mt-6" />
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        {projects.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-playfair text-3xl text-walnut-400 mb-4">
              Projects Coming Soon
            </p>
            <p className="font-cormorant text-xl text-walnut-500">
              We are curating our finest work. Please check back soon.
            </p>
          </div>
        ) : (
          <>
            {/* Featured Project */}
            {projects[0] && (
              <div className="mb-12">
                <ProjectCard
                  id={projects[0].id}
                  title={projects[0].title}
                  description={projects[0].description}
                  category={projects[0].category}
                  location={projects[0].location}
                  year={projects[0].year}
                  images={projects[0].images}
                  featured={projects[0].featured}
                  variant="large"
                />
              </div>
            )}

            {/* Rest of Projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.slice(1).map((project) => (
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
          </>
        )}
      </section>

      <Footer />
    </main>
  );
}
