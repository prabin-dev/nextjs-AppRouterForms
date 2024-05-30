import { NextRequest, NextResponse } from "next/server";
import { registrationSchema } from "@/app/registrationSchema";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const data = Object.fromEntries(formData);
  const parsed = registrationSchema.safeParse(data);

  if (parsed.success) {
    //Add parsed data to database
    return NextResponse.json({
      message: "User registered successfully",
      user: parsed.data,
    });
  } else {
    return NextResponse.json(
      { message: "User registration failed", error: parsed.error },
      { status: 400 }
    );
  }
}
