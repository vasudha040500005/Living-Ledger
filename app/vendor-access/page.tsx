"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function VendorAccessPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("vendor-credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    setLoading(false);
    if (result?.error) {
      setError("Invalid vendor credentials.");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <Image
        src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=80"
        alt="background"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-walnut-950/85" />

      <div className="relative z-10 w-full max-w-md mx-auto px-8">
        {/* Subtle logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-walnut-700/50 flex items-center justify-center mx-auto mb-4 border border-walnut-600">
            <Lock size={24} className="text-cream-300" />
          </div>
          <p className="font-lato text-xs tracking-[0.4em] uppercase text-walnut-500 mb-1">
            Restricted Access
          </p>
          <h1 className="font-playfair text-3xl text-cream-100">
            Vendor Portal
          </h1>
        </div>

        <div className="bg-walnut-900/70 backdrop-blur-sm border border-walnut-700 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="font-lato text-xs tracking-widest uppercase text-walnut-400 block mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, email: e.target.value }))
                }
                className="w-full bg-transparent border-b border-walnut-600 focus:border-cream-300 outline-none py-3 text-cream-200 placeholder-walnut-600 font-lato text-sm transition-colors"
                placeholder="vendor@domain.com"
                required
                autoComplete="off"
              />
            </div>
            <div>
              <label className="font-lato text-xs tracking-widest uppercase text-walnut-400 block mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, password: e.target.value }))
                  }
                  className="w-full bg-transparent border-b border-walnut-600 focus:border-cream-300 outline-none py-3 text-cream-200 placeholder-walnut-600 font-lato text-sm transition-colors pr-10"
                  placeholder="Secure password"
                  required
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-walnut-500 hover:text-cream-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="font-lato text-sm text-red-400 bg-red-900/30 px-4 py-3 border border-red-800">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-walnut-600 hover:bg-walnut-500 text-cream-50 py-3 font-lato tracking-widest uppercase text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Access Dashboard"}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 font-lato text-xs text-walnut-700">
          This portal is for authorized personnel only.
        </p>
      </div>
    </div>
  );
}
