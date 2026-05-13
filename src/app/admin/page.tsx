"use client";

import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ShieldCheck, Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

const ALLOWED_ADMINS = ["niyamulhasanbd@gmail.com", "niyamulhasan1089@gmail.com"];

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.email && ALLOWED_ADMINS.includes(user.email)) {
        toast.success("স্বাগতম, এডমিন!");
        router.push("/admin/dashboard");
      } else {
        await auth.signOut();
        toast.error("আপনি এডমিন হিসেবে অনুমোদিত নন!");
      }
    } catch (error: any) {
      toast.error("ভুল ইমেইল বা পাসওয়ার্ড!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (user.email && ALLOWED_ADMINS.includes(user.email)) {
        toast.success("গুগল লগইন সফল!");
        router.push("/admin/dashboard");
      } else {
        await auth.signOut();
        toast.error("এই ইমেইলটি এডমিন হিসেবে অনুমোদিত নন!");
      }
    } catch (error: any) {
      console.error("Google Login Error:", error);
      toast.error(`গুগল লগইন ব্যর্থ হয়েছে: ${error.message || "আবার চেষ্টা করুন"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("অনুগ্রহ করে আগে আপনার ইমেইলটি লিখুন!");
      return;
    }
    try {
      const { sendPasswordResetEmail } = await import("firebase/auth");
      await sendPasswordResetEmail(auth, email);
      toast.success("পাসওয়ার্ড রিসেট লিঙ্ক আপনার ইমেইলে পাঠানো হয়েছে!");
    } catch (error: any) {
      toast.error("লিঙ্ক পাঠাতে সমস্যা হয়েছে। ইমেইলটি সঠিক কিনা চেক করুন।");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden px-4">
      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 group mb-8">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-emerald-500">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tighter">
              AKHI<span className="text-emerald-500">POULTRY</span>
            </h1>
          </Link>
          <h2 className="text-3xl font-bold text-white mb-2">এডমিন প্যানেল</h2>
          <p className="text-gray-500">আপনার একাউন্টে লগইন করুন</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 glass p-8 rounded-[2.5rem]">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">ইমেইল</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50"
                placeholder="admin@akhipoultry.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">পাসওয়ার্ড</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50"
                placeholder="••••••••"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-xs text-emerald-500 hover:text-emerald-400 font-bold transition"
              >
                পাসওয়ার্ড ভুলে গেছেন?
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-900/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>লগইন করুন <ArrowRight className="w-5 h-5" /></>
            )}
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#050505] px-2 text-gray-500 font-bold">অথবা</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <FcGoogle className="w-6 h-6" />
            গুগল দিয়ে লগইন
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-white transition">
            ← ওয়েবসাইটে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
