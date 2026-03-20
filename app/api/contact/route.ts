import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ message: "All required fields must be filled." }, { status: 400 });
    }

    const contact = await prisma.contactMessage.create({
      data: { name, email, phone: phone || null, subject, message },
    });

    return NextResponse.json(contact, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Failed to send message" }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "VENDOR") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(messages);
  } catch {
    return NextResponse.json({ message: "Failed to fetch" }, { status: 500 });
  }
}
