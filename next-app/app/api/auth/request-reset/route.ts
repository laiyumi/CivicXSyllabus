import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { Resend } from "resend";
import bcrypt from "bcrypt";
import { RestPasswordEmailTemplate } from "@/app/components/RestPasswordEmailTemplate";

export async function POST(request: NextRequest) {
  const { email, type } = await request.json();
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // find the user
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  if (!user.password) {
    return NextResponse.json(
      {
        error: "User does not have a password, try to login via Google account",
      },
      { status: 400 }
    );
  }

  // generate a reset token with 6-Character Alphanumeric Code
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Avoid ambiguous characters
  let resetToken = "";
  for (let i = 0; i < 6; i++) {
    resetToken += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  const hashedToken = await bcrypt.hash(resetToken, 10);
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry

  // store the reset token in the db
  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token: hashedToken,
      expires: expiresAt,
    },
  });

  const resend = new Resend(process.env.RESEND_API_KEY);

  if (type === "byEmail") {
    try {
      const response = await resend.emails.send({
        from: process.env.EMAIL_USER ?? "contact@civicxsyllabus.org",
        to: email,
        subject: "Civic X Syllabus Password Reset",
        react: RestPasswordEmailTemplate({ resetToken: resetToken }),
      });

      console.log("Resend API Response:", response);
      return NextResponse.json({
        message: "Reset token sent to email",
        response,
      });
    } catch (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }
  }
  if (type === "default") {
    return NextResponse.json({
      Message: "Reset token generated",
      resetToken,
    });
  }
}
