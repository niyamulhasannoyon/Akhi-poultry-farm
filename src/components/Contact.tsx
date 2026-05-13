"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send, Phone, MapPin, MessageSquare } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Info */}
          <div className="space-y-12">
            <div>
              <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold uppercase tracking-widest text-xs mb-4">
                যোগাযোগ
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                আপনার খামারের জন্য <br />
                <span className="gradient-text">সেরা সমাধান</span>
              </h2>
              <p className="text-gray-400 text-lg">
                যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন। আমাদের বিশেষজ্ঞ টিম আপনাকে সাহায্য করতে প্রস্তুত।
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">সরাসরি কল করুন</h4>
                  <p className="text-gray-400 text-sm mb-2">প্রতিদিন সকাল ৮টা থেকে রাত ৮টা</p>
                  <p className="text-xl font-black text-white tracking-tighter">01737-451342</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">আমাদের অবস্থান</h4>
                  <p className="text-gray-400 text-sm mb-2">খামার এবং অফিস</p>
                  <p className="text-gray-200 font-medium">জালমাছমারি, শিবগঞ্জ, চাঁপাইনবাবগঞ্জ</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">WhatsApp চ্যাট</h4>
                  <p className="text-gray-400 text-sm mb-2">দ্রুত বার্তার জন্য</p>
                  <a href="https://wa.me/8801737451342" target="_blank" className="text-emerald-500 font-bold hover:underline">চ্যাট শুরু করুন</a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="premium-card p-10 bg-white/5"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">আপনার নাম</label>
                  <input 
                    type="text" 
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50"
                    placeholder="নাম লিখুন"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">ফোন নাম্বার</label>
                  <input 
                    type="tel" 
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50"
                    placeholder="017xx-xxxxxx"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">বিষয়</label>
                <select className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 appearance-none">
                  <option>অর্ডার করতে চাই</option>
                  <option>পরামর্শ প্রয়োজন</option>
                  <option>অভিযোগ / মতামত</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">বার্তা</label>
                <textarea 
                  rows={4}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50"
                  placeholder="আপনার বার্তা লিখুন..."
                ></textarea>
              </div>
              <button className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-900/40 transition-all flex items-center justify-center gap-2">
                বার্তা পাঠান <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
