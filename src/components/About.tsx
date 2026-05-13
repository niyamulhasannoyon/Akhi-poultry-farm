"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

const About = () => {
  const points = [
    { title: "১০০% অর্গানিক ও হালাল", desc: "আমরা পালনে কোনো ক্ষতিকারক রাসায়নিক ব্যবহার করি না।" },
    { title: "সঠিক বাজার দর", desc: "আমরা সবসময় ন্যায্য মূল্যে পণ্য সরবরাহ করি।" },
    { title: "স্থানীয় অভিজ্ঞতা", desc: "শিবগঞ্জ এলাকার স্থানীয় খামারিদের সমস্যা আমরা ভালো বুঝি।" },
    { title: "আধুনিক ব্যবস্থাপনা", desc: "কঠোর স্বাস্থ্যবিধি এবং আধুনিক প্রযুক্তির সমন্বয়।" },
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden bg-black/20">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Content */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            >
              <span className="inline-block py-1.5 px-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-black uppercase tracking-[0.3em] text-[10px] mb-8">
                About Our Farm
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.95] tracking-tighter">
                গুণগত মানে <br />
                <span className="gradient-text">আপোষহীন</span>
              </h2>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-xl">
                আখি পোল্ট্রি ফার্ম (Akhi Poultry Farm) দীর্ঘ দিন ধরে শিবগঞ্জ এলাকায় শতভাগ হালাল এবং স্বাস্থ্যসম্মত উপায়ে পোল্ট্রি সমাধান দিয়ে আসছে। আমাদের মিশন হলো প্রতিটি ঘরে সেরা মানের মাংস ও ডিম পৌঁছে দেওয়া।
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
              {points.map((p, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.8 }}
                  className="group"
                >
                  <div className="flex items-center gap-3 text-emerald-500 font-black text-lg mb-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span>{p.title}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed pl-11">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Card Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-emerald-500 blur-[100px] opacity-10 animate-pulse"></div>
            <div className="relative glass p-12 rounded-[3rem] border-white/10 shadow-2xl space-y-10">
              <div className="space-y-4">
                <h4 className="text-3xl font-black text-white tracking-tight leading-tight">আজকের বাজার দর জানতে চান?</h4>
                <p className="text-gray-400 text-sm leading-relaxed">আপনার খামারের জন্য সেরা মানের মুরগি বা ফিড অর্ডার দিতে অথবা প্রতিদিনের পাইকারি দাম জানতে সরাসরি আমাদের সাথে যোগাযোগ করুন।</p>
              </div>

              <div className="p-8 rounded-[2rem] bg-black/40 border border-white/5 flex items-center justify-between group hover:border-emerald-500/30 transition-all duration-500">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-emerald-500 font-black mb-2">HOTLINE 24/7</p>
                  <p className="text-3xl font-black text-white tracking-tighter">01737-451342</p>
                </div>
                <a href="tel:+8801737451342" className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-xl shadow-emerald-900/40 hover:bg-emerald-500 hover:scale-110 transition-all duration-500">
                  <ArrowRight className="w-8 h-8" />
                </a>
              </div>

              <div className="flex items-center gap-6 border-t border-white/10 pt-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500 blur-md opacity-20 rounded-full"></div>
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-500/30 relative z-10 shadow-2xl">
                    <img src="/malek.jpg" alt="Abdul Malek" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
                </div>
                <div>
                  <h5 className="text-lg font-black text-white">মো: আব্দুল মালেক</h5>
                  <p className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.3em]">PROPRIETOR</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
