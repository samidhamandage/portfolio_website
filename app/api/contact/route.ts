import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // In a real application, you would integrate with Resend, Nodemailer, etc. here
    // Example: await resend.emails.send({...})
    
    // Simulating network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Basic validation mock
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
