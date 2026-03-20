import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sampleProjects = [
  {
    title: "The Sharma Residence",
    description:
      "A luxurious 4BHK apartment in Whitefield, Bangalore, transformed into a warm contemporary home. The brief was to blend modern aesthetics with the family's love for traditional Indian art. We used a palette of warm creams, deep teals, and gold accents throughout. Custom-crafted teak wood furniture, hand-woven textiles from Jaipur, and carefully curated art pieces bring personality to every corner. The open-plan living and dining area features a stunning 12-foot dining table crafted from a single slab of mango wood.",
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
      "A fine dining restaurant in Indiranagar designed to evoke the opulence of 1920s Paris. Velvet banquette seating in midnight blue, brass fixtures, and warm Edison lighting create an intimate atmosphere. The bar area features a dramatic backlit onyx wall that becomes the focal point of the space. Custom mosaic flooring and bespoke ceiling details complete the theatrical experience.",
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
      "A 15,000 sq ft technology company headquarters designed to inspire innovation and collaboration. The design concept — 'structured freedom' — balances focused work zones with dynamic collaboration spaces. Biophilic design elements, including a 30-foot green wall and indoor trees, connect employees with nature. The palette of whites, greys, and pops of the brand's signature orange energizes the space.",
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
      "A sprawling 6BHK villa in Sadashivanagar designed for a multigenerational family. The challenge was to create spaces that worked for grandparents, parents, and two teenage children while maintaining aesthetic cohesion. Each floor has its own design story while the common areas bring the family together. The basement entertainment room with a home theater is the family's favourite retreat.",
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
      "A high-end women's fashion boutique in Koramangala that needed to reflect the brand's philosophy of sustainable luxury. We used reclaimed wood, natural stone, and organic textures throughout. The fitting rooms are designed as private sanctuaries with flattering lighting and lush greenery. A central 'style lounge' encourages customers to linger and discover.",
    category: "Retail",
    location: "Koramangala, Bangalore",
    year: "2022",
    featured: false,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&q=80",
    ]),
  },
];

async function main() {
  console.log("Seeding database...");
  for (const project of sampleProjects) {
    await prisma.project.upsert({
      where: { id: project.title.toLowerCase().replace(/ /g, "-") },
      update: {},
      create: project,
    });
  }
  console.log("Database seeded successfully!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
