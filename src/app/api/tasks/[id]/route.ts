// app/api/tasks/[id]/route.ts
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Task from "@/models/Task";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const params = await context.params;
    await connectDB();
    
    const task = await Task.findOne({
      _id: params.id,
      user: session.user.id,
    });

    if (!task) {
      return new NextResponse("Task not found", { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    console.error("GET task error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const params = await context.params;
    const { title } = await request.json();
    
    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    await connectDB();
    
    const task = await Task.findOneAndUpdate(
      {
        _id: params.id,
        user: session.user.id,
      },
      { title },
      { new: true }
    );

    if (!task) {
      return new NextResponse("Task not found", { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    console.error("PUT task error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const params = await context.params;
    await connectDB();
    
    const task = await Task.findOneAndDelete({
      _id: params.id,
      user: session.user.id,
    });

    if (!task) {
      return new NextResponse("Task not found", { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("DELETE task error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}