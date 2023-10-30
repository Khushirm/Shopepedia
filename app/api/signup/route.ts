import bcrypt from "bcrypt";
import prismadb from "@/lib/prismadb";
import { NextResponse, NextRequest } from "next/server"; 

export async function POST(req: NextRequest) {
  
  try {
    const { email, name, password } = await req.json();
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return NextResponse.json({ error: "Email taken" }, { status: 409 }); 
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        emailVerified: new Date(),
      },
    });
    return NextResponse.json(
      {
        message: "Account created successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Some error occured. Please try again later!",
      },
      { status: 500 }
    );
  }
}
