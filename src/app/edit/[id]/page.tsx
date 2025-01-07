// app/edit/[id]/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function EditTaskPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTask() {
      try {
        const response = await fetch(`/api/tasks/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch task");
        const task = await response.json();
        setTitle(task.title);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch task",
          variant: "destructive",
        });
        router.push("/dashboard");
      } finally {
        setIsLoading(false);
      }
    }

    fetchTask();
  }, [params.id, router, toast]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const response = await fetch(`/api/tasks/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) throw new Error("Failed to update task");

      toast({
        title: "Success",
        description: "Task updated successfully",
      });
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      });
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-xl font-semibold mb-6">Edit Task</h1>
          <div className="space-y-4">
            <div>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
                className="w-full"
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit">
                Update Task
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}