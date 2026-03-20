import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "VENDOR") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  try {
    const msg = await prisma.contactMessage.update({
      where: { id },
      data: { read: true },
    });
    return NextResponse.json(msg);
  } catch {
    return NextResponse.json({ message: "Failed" }, { status: 500 });
  }
}
