"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const Testimonials = () => {
  const reviews = [
    {
      name: "রহিম আহমেদ",
      role: "নিয়মিত গ্রাহক",
      text: "শিবগঞ্জে সেরা মানের মুরগি! আমি গত ২ বছর ধরে কিনছি এবং মান সবসময় চমৎকার।",
      initials: "RA",
      rating: 5
    },
    {
      name: "Karim Sheikh",
      role: "Restaurant Owner",
      text: "Their home delivery service is very fast. Highly recommended for fresh eggs and meat.",
      initials: "KS",
      rating: 4
    },
    {
      name: "Mst. Jamila",
      role: "Housewife",
      text: "Clean farm and very polite behavior of the staff. Very transparent pricing.",
      initials: "MJ",
      rating: 5
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-[#0a0a0a]">
      {/* Mesh Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full mesh-gradient opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block py-1.5 px-4 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 font-black uppercase tracking-[0.3em] text-[10px] mb-8"
          >
            Our Reviews
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter"
          >
            What Our <span className="text-yellow-500">Farmers</span> Say
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {reviews.map((r, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="premium-card p-10 bg-white/[0.02] border-white/5 group hover:border-yellow-500/30 transition-all duration-700"
            >
              <div className="flex gap-1.5 mb-10">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={cn(
                      "w-5 h-5 transition-transform duration-500 group-hover:scale-110",
                      i < r.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-700"
                    )} 
                  />
                ))}
              </div>
              
              <div className="relative mb-12">
                <Quote className="absolute -top-6 -left-6 w-16 h-16 text-white/[0.03] transition-colors group-hover:text-yellow-500/5 duration-700" />
                <p className="text-gray-300 italic text-lg leading-relaxed relative z-10 font-medium">
                  &quot;{r.text}&quot;
                </p>
              </div>

              <div className="flex items-center gap-5 border-t border-white/5 pt-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center font-black text-white text-xl shadow-2xl group-hover:scale-110 transition-transform duration-700">
                  {r.initials}
                </div>
                <div>
                  <h4 className="text-xl font-black text-white group-hover:text-yellow-500 transition-colors duration-500">{r.name}</h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-black">{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
