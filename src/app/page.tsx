"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        alert("Invalid credentials!");
        setIsLoading(false);
        return;
      }

      const data = await res.json();
      console.log("Login success:", data);
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Server error, please try again later.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div>
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center">
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Welcome to Inventory System</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-black text-sm font-medium mb-1">Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-black text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your email"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !email || !password}
            className={`w-full py-2 rounded-md text-white font-semibold transition ${
              isLoading || !email || !password
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
