import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });
    const serialized = projects.map((p) => ({
      ...p,
      images: JSON.parse(p.images) as string[],
    }));
    return NextResponse.json(serialized);
  } catch {
    return NextResponse.json({ message: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "VENDOR") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, description, category, location, year, featured, images } = body;

    if (!title || !description || !category) {
      return NextResponse.json(
        { message: "Title, description, and category are required" },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        category,
        location: location || null,
        year: year || null,
        featured: Boolean(featured),
        images: JSON.stringify(images || []),
      },
    });

    return NextResponse.json(
      { ...project, images: images || [] },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ message: "Failed to create project" }, { status: 500 });
  }
}
