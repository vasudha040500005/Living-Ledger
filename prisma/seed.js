const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const projects = [
  {
    title: "The Sharma Residence",
    description:
      "A luxurious 4BHK apartment in Whitefield, Bangalore, transformed into a warm contemporary home. The brief was to blend modern aesthetics with the family's love for traditional Indian art. We used a palette of warm creams, deep teals, and gold accents throughout. Custom-crafted teak wood furniture, hand-woven textiles from Jaipur, and carefully curated art pieces bring personality to every corner.",
    category: "Residential",
    location: "Whitefield, Bangalore",
    year: "2024",
    featured: true,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
      "https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1200&q=80",
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&q=80",
    ]),
  },
  {
    title: "Aria Restaurant & Lounge",
    description:
      "A fine dining restaurant in Indiranagar designed to evoke the opulence of 1920s Paris. Velvet banquette seating in midnight blue, brass fixtures, and warm Edison lighting create an intimate atmosphere. The bar area features a dramatic backlit onyx wall that becomes the focal point of the space.",
    category: "Hospitality",
    location: "Indiranagar, Bangalore",
    year: "2023",
    featured: true,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    ]),
  },
  {
    title: "TechVision Corporate HQ",
    description:
      "A 15,000 sq ft technology company headquarters designed to inspire innovation and collaboration. The design concept balances focused work zones with dynamic collaboration spaces. Biophilic design elements including a 30-foot green wall connect employees with nature.",
    category: "Commercial",
    location: "MG Road, Bangalore",
    year: "2023",
    featured: false,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80",
    ]),
  },
  {
    title: "Nair Family Villa",
    description:
      "A sprawling 6BHK villa in Sadashivanagar designed for a multigenerational family. The challenge was to create spaces that work for grandparents, parents, and teenage children while maintaining aesthetic cohesion.",
    category: "Residential",
    location: "Sadashivanagar, Bangalore",
    year: "2024",
    featured: false,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80",
    ]),
  },
  {
    title: "Bloom Boutique",
    description:
      "A high-end fashion boutique in Koramangala reflecting sustainable luxury. Reclaimed wood, natural stone, and organic textures throughout. Fitting rooms designed as private sanctuaries with flattering lighting.",
    category: "Retail",
    location: "Koramangala, Bangalore",
    year: "2022",
    featured: false,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&q=80",
    ]),
  },
];

async function main() {
  console.log("Seeding database with sample projects...");
  for (const project of projects) {
    await prisma.project.create({ data: project });
  }
  console.log("Done! Created", projects.length, "projects.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
