"use client";

import React from "react";
import { motion } from "framer-motion";
import { Leaf, Truck, Medal, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const Features = () => {
  const features = [
    {
      icon: Leaf,
      title: "১০০% অর্গানিক",
      desc: "কোনো ক্ষতিকর রাসায়নিক বা নিষিদ্ধ উপাদান নেই",
      color: "emerald",
    },
    {
      icon: Truck,
      title: "দ্রুত ডেলিভারি",
      desc: "স্থানীয় এলাকায় ২ ঘন্টার মধ্যে ডেলিভারি নিশ্চিত",
      color: "yellow",
    },
    {
      icon: ShieldCheck,
      title: "হালাল গ্যারান্টি",
      desc: "সম্পূর্ণ ইসলামী শরীয়াহ মোতাবেক পালিত ও প্রসেসড",
      color: "cyan",
    },
    {
      icon: Medal,
      title: "সেরা মান",
      desc: "অভিজ্ঞ ভেটেরিনারি সার্জন দ্বারা নিয়মিত চেকআপ",
      color: "purple",
    },
  ];

  return (
    <section className="relative z-20 -mt-20 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="group premium-card p-10 flex flex-col items-center text-center bg-black/40 backdrop-blur-3xl border-white/5 hover:border-emerald-500/30"
          >
            <div className={cn(
              "w-20 h-20 rounded-[1.5rem] flex items-center justify-center mb-8 transition-all duration-700",
              f.color === "emerald" ? "bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]" : 
              f.color === "yellow" ? "bg-yellow-500/10 text-yellow-500 group-hover:bg-yellow-500 group-hover:text-white group-hover:shadow-[0_0_30px_rgba(234,179,8,0.3)]" :
              f.color === "cyan" ? "bg-cyan-500/10 text-cyan-500 group-hover:bg-cyan-500 group-hover:text-white group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]" :
              "bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
            )}>
              <f.icon className="w-10 h-10 transition-transform duration-500 group-hover:scale-110" />
            </div>
            <h3 className="text-2xl font-black text-white mb-4 tracking-tight group-hover:text-emerald-400 transition-colors">{f.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">{f.desc}</p>
            
            {/* Animated Bottom Accent */}
            <div className={cn(
              "absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700",
              f.color === "emerald" ? "bg-emerald-500" : 
              f.color === "yellow" ? "bg-yellow-500" :
              f.color === "cyan" ? "bg-cyan-500" : "bg-purple-500"
            )}></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
