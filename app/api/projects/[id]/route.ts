import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({
      ...project,
      images: JSON.parse(project.images) as string[],
    });
  } catch {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "VENDOR") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  try {
    const body = await req.json();
    const { title, description, category, location, year, featured, images } = body;
    const project = await prisma.project.update({
      where: { id },
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
    return NextResponse.json({ ...project, images: images || [] });
  } catch {
    return NextResponse.json({ message: "Failed to update" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "VENDOR") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  try {
    const body = await req.json();
    const project = await prisma.project.update({
      where: { id },
      data: body,
    });
    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ message: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "VENDOR") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  try {
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json({ message: "Failed to delete" }, { status: 500 });
  }
}
