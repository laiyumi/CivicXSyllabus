import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
    });

    const resetToken = Math.random().toString(36).slice(2); // Example token, use JWT for real case
    const resetLink = `https://yourdomain.com/reset-password?token=${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER!,
      to: email,
      subject: "Password Reset Request",
      text: `Click the following link to reset your password: ${resetLink}`,
    });

    console.log("Reset email sent to:", email);

    return NextResponse.json({
      success: true,
      message: "Password reset email sent!",
    });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
