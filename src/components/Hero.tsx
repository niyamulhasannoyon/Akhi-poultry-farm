"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, MessageSquare, ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-gradient">
      {/* Background with Blur Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=1920&auto=format&fit=crop"
          className="w-full h-full object-cover brightness-[0.2] contrast-[1.1] grayscale-[0.2]"
          alt="Akhi Poultry Farm Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505]"></div>
        
        {/* Animated Glows */}
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[150px] animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-40 pb-40">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-[13px] font-black tracking-widest mb-10 backdrop-blur-2xl uppercase"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Trusted by 500+ Farmers in Shibganj
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="text-5xl md:text-8xl font-black text-white leading-[0.95] mb-10 tracking-tighter"
        >
          সেরা মানের মুরগি ও <br />
          <span className="gradient-text">পুষ্টিকর ফিড</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto mb-16 font-medium leading-relaxed"
        >
          শিবগঞ্জ, চাঁপাইনবাবগঞ্জ এলাকার পোল্ট্রি খামারিদের প্রথম পছন্দ। আমরা দিচ্ছি ১০০% অর্গানিক ও হালাল মুরগি এবং উন্নত মানের ফিড সরাসরি খামার থেকে।
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <a
            href="#products"
            className="group relative px-12 py-5 rounded-[1.5rem] bg-emerald-600 hover:bg-emerald-500 text-white font-black text-lg transition-all duration-500 shadow-[0_20px_50px_rgba(16,185,129,0.3)] hover:shadow-[0_20px_60px_rgba(16,185,129,0.5)] hover:scale-[1.05] overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2 tracking-tight">
              অর্ডার করুন <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-[50%] -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
          </a>

          <a
            href="https://wa.me/8801737451342"
            target="_blank"
            className="flex items-center gap-3 px-12 py-5 rounded-[1.5rem] bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black text-lg transition-all duration-500 backdrop-blur-2xl hover:border-emerald-500/50"
          >
            <MessageSquare className="w-6 h-6 text-emerald-400" /> চ্যাট করুন
          </a>
        </motion.div>
      </div>

      {/* Stats Overlay for SEO & Context */}
      <div className="absolute bottom-10 left-10 hidden xl:flex flex-col gap-1 text-[10px] font-black text-gray-600 tracking-[0.3em] uppercase">
        <span>Akhi Poultry Farm</span>
        <span>Est. 2020</span>
        <span>Shibganj, Chapainawabganj</span>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 15, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-emerald-500/50"
      >
        <ArrowDown className="w-7 h-7" />
      </motion.div>
    </section>
  );
};

export default Hero;
