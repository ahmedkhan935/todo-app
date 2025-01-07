// app/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Welcome to Todo App</h1>
        <p className="text-lg text-gray-600">Organize your tasks efficiently</p>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/auth/register">Register</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}