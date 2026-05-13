"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShoppingBasket, Plus, AlertCircle } from "lucide-react";
import { Product, useCart } from "@/context/CartContext";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();
  const isOutOfStock = product.stock === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group premium-card flex flex-col h-full bg-white/[0.01] hover:bg-white/[0.04] border-white/5 hover:border-emerald-500/30 transition-all duration-700"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden rounded-t-[2rem]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700"></div>
        
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
            <div className="border-2 border-red-500/50 rounded-2xl px-6 py-2 text-red-500 font-black text-lg tracking-widest rotate-[-5deg] shadow-2xl">
              স্টক শেষ
            </div>
          </div>
        )}

        <div className="absolute top-6 left-6 glass-dark px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 border border-emerald-500/20 shadow-xl">
          {product.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-black text-white group-hover:text-emerald-400 transition-colors duration-500 tracking-tight">
            {product.name}
          </h3>
          <span className="flex flex-col items-end">
            <span className="text-emerald-400 font-black text-xl">৳{product.price}</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">প্রতি {product.unit}</span>
          </span>
        </div>
        
        <p className="text-gray-400 text-sm mb-8 flex-1 line-clamp-2 leading-relaxed font-medium">
          {product.desc}
        </p>

        <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
          <div className="flex items-center gap-2.5">
            <div className={`relative flex h-2 w-2 ${isOutOfStock ? 'opacity-50' : ''}`}>
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isOutOfStock ? 'bg-red-400' : 'bg-emerald-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isOutOfStock ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
            </div>
            <span className={`text-[11px] font-black uppercase tracking-widest ${isOutOfStock ? 'text-gray-500' : 'text-emerald-500'}`}>
              {isOutOfStock ? "শীঘ্রই আসছে" : `${product.stock} ${product.unit} ইন স্টক`}
            </span>
          </div>

          <button
            onClick={() => !isOutOfStock && addToCart(product)}
            disabled={isOutOfStock}
            className="group/btn relative px-6 py-3 rounded-2xl bg-white/5 hover:bg-emerald-600 border border-white/10 hover:border-emerald-500 text-white text-xs font-black transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed shadow-xl overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2 uppercase tracking-widest">
              অর্ডার <Plus className="w-3.5 h-3.5 group-hover/btn:rotate-90 transition duration-500" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
