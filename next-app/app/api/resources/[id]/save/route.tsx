import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {}
