// app/api/tasks/route.ts
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Task from "@/models/Task";
import { getSession, useSession } from "next-auth/react";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();
    const tasks = await Task.find({ user: session.user.id }).sort({ createdAt: -1 });
    
    return NextResponse.json(tasks);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    console.log("POST request");
    const session = await getServerSession(authOptions);
    console.log("session", session);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { title } = await request.json();
    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    await connectDB();
    console.log("session.user.id", session.user.id);
    const task = await Task.create({
      title,
      user: session.user.id,
    });
    
    return NextResponse.json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}