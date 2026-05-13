"use client";

import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Info } from "lucide-react";

const PRODUCTS_DATA = [
  { id: 101, name: "সোনালী রোস্ট", category: "chicken", price: 340, stock: 40, unit: "কেজি", image: "https://images.unsplash.com/photo-1615557960916-5f4791effe9d?q=80&w=600", desc: "সেরা মানের রোস্টের উপযোগী সোনালী মুরগি।" },
  { id: 102, name: "সোনালী মুরগি", category: "chicken", price: 320, stock: 60, unit: "কেজি", image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=600", desc: "লাইভ রেগুলার সোনালী মুরগি।" },
  { id: 103, name: "ব্রয়লার মুরগি", category: "chicken", price: 180, stock: 150, unit: "কেজি", image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=600", desc: "খামারের তাজা ব্রয়লার মুরগি।" },
  { id: 201, name: "সোনালী স্টার্টার", category: "feed", price: 3400, stock: 20, unit: "ব্যাগ", image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=600", desc: "সোনালী বাচ্চার জন্য স্টার্টার ফিড।" },
  { id: 202, name: "সোনালী গ্রোয়ার", category: "feed", price: 3300, stock: 25, unit: "ব্যাগ", image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=600", desc: "দ্রুত বৃদ্ধির জন্য গ্রোয়ার ফিড।" },
  { id: 203, name: "ব্রয়লার স্টার্টার", category: "feed", price: 3500, stock: 15, unit: "ব্যাগ", image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=600", desc: "ব্রয়লারের জন্য উচ্চ প্রোটিন যুক্ত স্টার্টার।" },
  { id: 401, name: "সোনালী বাচ্চা (আদর্শ)", category: "chicks", price: 45, stock: 0, unit: "পিস", image: "https://images.unsplash.com/photo-1579165352523-28682dc193ee?q=80&w=600", desc: "গ্রেড এ আদর্শ সোনালী বাচ্চা।" },
  { id: 403, name: "ব্রয়লার বাচ্চা", category: "chicks", price: 65, stock: 500, unit: "পিস", image: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=600", desc: "এক দিনের ব্রয়লার বাচ্চা।" },
  { id: 501, name: "রেনামাইসিন", category: "medicine", price: 120, stock: 50, unit: "বক্স", image: "https://www.renata-ltd.com/wp-content/uploads/2021/04/Renamycin-100-Tabs.jpg", desc: "পোল্ট্রির জন্য অ্যান্টিবায়োটিক।" },
  { id: 502, name: "নাপা এক্সট্রা", category: "medicine", price: 30, stock: 100, unit: "পাতা", image: "https://cdn.osudpotro.com/medicine/napa-extra-500mg-65mg-tablet-1635674064132.webp", desc: "ব্যথা এবং জ্বরের উপশম।" },
];

const ProductSection = () => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const categories = [
    { label: "সব পণ্য", id: "all" },
    { label: "মুরগি", id: "chicken" },
    { label: "বাচ্চা", id: "chicks" },
    { label: "ফিড", id: "feed" },
    { label: "ওষুধ", id: "medicine" },
  ];

  const filteredProducts = PRODUCTS_DATA.filter((p) => {
    const matchFilter = filter === "all" || p.category === filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <section id="products" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block py-1 px-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold uppercase tracking-widest text-xs mb-4"
          >
            তাজা পণ্য কিনুন
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white mb-6"
          >
            সেরা <span className="gradient-text">সিলেকশন</span>
          </motion.h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            সরাসরি আমাদের খামার থেকে আপনার কাছে। আমাদের বিভিন্ন ধরণের সুস্থ মুরগি এবং সেরা মানের ফিড থেকে বেছে নিন।
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between glass p-4 rounded-3xl">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                  filter === cat.id
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/40"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="পণ্য খুঁজুন..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-full py-3 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all"
            />
          </div>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center text-gray-500">
            <Info className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="text-xl">কোনো পণ্য পাওয়া যায়নি</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSection;
