import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // allow all (for now)
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handle OPTIONS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// GET all users
export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users, { headers: corsHeaders });
}

// POST create new user
export async function POST(req: Request) {
  const data = await req.json();
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
    },
  });
  return NextResponse.json(user, { headers: corsHeaders });
}
