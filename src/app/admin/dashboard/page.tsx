"use client";

import React, { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut, 
  Plus, 
  TrendingUp, 
  Box,
  ChevronRight,
  Loader2,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import AdminOrders from "@/components/AdminOrders";

const ALLOWED_ADMINS = ["niyamulhasanbd@gmail.com", "niyamulhasan1089@gmail.com"];

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u && u.email && ALLOWED_ADMINS.includes(u.email)) {
        setUser(u);
      } else {
        if (u) signOut(auth);
        router.push("/admin");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("লগআউট সফল হয়েছে");
      router.push("/admin");
    } catch (error) {
      toast.error("লগআউট ব্যর্থ হয়েছে");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
      </div>
    );
  }

  const stats = [
    { label: "মোট পণ্য", value: "১২", icon: Box, color: "emerald" },
    { label: "আজকের অর্ডার", value: "৫", icon: ShoppingBag, color: "blue" },
    { label: "মোট কাস্টমার", value: "১৫০+", icon: Users, color: "purple" },
    { label: "রেভিনিউ", value: "৳১২,৫০০", icon: TrendingUp, color: "yellow" },
  ];

  const recentActivities = [
    { type: "LOGIN", user: user?.email, time: "২ মিনিট আগে", detail: "সফলভাবে লগইন করেছেন" },
    { type: "ORDER", user: "Karim Sheikh", time: "১৫ মিনিট আগে", detail: "২টি মুরগির জন্য অর্ডার করেছেন" },
    { type: "PRODUCT", user: "Admin", time: "১ ঘণ্টা আগে", detail: "মুরগির দাম আপডেট করেছেন" },
  ];

  const navItems = [
    { id: "dashboard", name: "ড্যাশবোর্ড", icon: LayoutDashboard },
    { id: "orders", name: "অর্ডার হিস্টোরি", icon: ShoppingBag },
    { id: "products", name: "পণ্য ম্যানেজমেন্ট", icon: Box },
    { id: "settings", name: "সেটিংস", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col fixed h-full z-20">
        <div className="p-8 border-b border-white/5">
          <Link href="/" className="flex items-center gap-3 group">
            <h1 className="text-xl font-black text-white tracking-tighter">
              AKHI<span className="text-emerald-500">POULTRY</span>
            </h1>
          </Link>
          <div className="flex flex-col gap-1 mt-2">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Admin Dashboard</p>
            <Link href="/" className="text-[8px] text-emerald-500 hover:text-emerald-400 uppercase font-black tracking-widest flex items-center gap-1 transition-all">
              <ArrowRight className="w-2 h-2" /> ওয়েবসাইট দেখুন
            </Link>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === item.id 
                  ? "bg-emerald-600/10 text-emerald-500 border border-emerald-500/20" 
                  : "text-gray-500 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <div className="flex items-center gap-3 mb-6 px-4">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px] font-bold text-emerald-500 uppercase">
              {user?.email?.[0]}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{user?.email}</p>
              <p className="text-[8px] text-gray-500 uppercase font-black">Logged In</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            লগআউট
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-10">
        {activeTab === "dashboard" ? (
          <>
            <header className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">হ্যালো, এডমিন! 👋</h2>
                <p className="text-gray-500 text-sm">আখি পোল্ট্রি ফার্মের আজকের আপডেট দেখুন</p>
              </div>
              <button 
                onClick={() => setActiveTab("products")}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-lg shadow-emerald-900/40"
              >
                <Plus className="w-5 h-5" /> নতুন পণ্য যোগ করুন
              </button>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {stats.map((s, idx) => (
                <div key={idx} className="premium-card p-6 flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-500">
                    <s.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{s.label}</p>
                    <p className="text-2xl font-black text-white">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Orders Overview */}
              <div className="lg:col-span-2 premium-card overflow-hidden h-fit">
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white">সাম্প্রতিক অর্ডার</h3>
                  <button 
                    onClick={() => setActiveTab("orders")}
                    className="text-sm text-emerald-500 hover:underline flex items-center gap-1 font-bold"
                  >
                    সব দেখুন <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-12 text-center text-gray-500">
                  <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-5" />
                  <p className="font-bold">বিস্তারিত দেখতে 'অর্ডার হিস্টোরি' ট্যাবে যান</p>
                </div>
              </div>

              {/* Activity Log */}
              <div className="premium-card h-fit">
                <div className="p-6 border-b border-white/5">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-500" /> এক্টিভিটি লগ
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  {recentActivities.map((act, idx) => (
                    <div key={idx} className="relative pl-6 pb-6 border-l border-white/10 last:pb-0">
                      <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-xs font-black text-white tracking-tight uppercase">{act.type}</p>
                        <span className="text-[8px] text-gray-600 font-bold uppercase">{act.time}</span>
                      </div>
                      <p className="text-sm text-gray-400 font-medium mb-1">{act.detail}</p>
                      <p className="text-[10px] text-gray-600 font-bold">{act.user}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : activeTab === "orders" ? (
          <AdminOrders />
        ) : (
          <div className="premium-card p-20 text-center text-gray-500">
            <Settings className="w-16 h-16 mx-auto mb-4 opacity-5" />
            <p className="font-bold">এই বিভাগটি শীঘ্রই যুক্ত করা হবে</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
