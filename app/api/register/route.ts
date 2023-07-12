import bcrypt from "bcrypt";
import prisma from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, password } = body;

    if (!email || !password || !name)
      return new NextResponse("Missing info", { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.log(error, "Error in /register route");
    return new NextResponse("Register error", { status: 500 });
  }
}
