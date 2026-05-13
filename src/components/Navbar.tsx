"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { 
  ShoppingBasket, 
  Menu, 
  X, 
  ChevronRight, 
  Phone, 
  MapPin, 
  LayoutDashboard,
  ShieldCheck,
  Plus,
  Minus,
  Trash2,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, cartCount, cartTotal, updateQuantity, removeFromCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "হোম", href: "#home" },
    { name: "আমাদের সম্পর্কে", href: "#about" },
    { name: "সেবাসমূহ", href: "#products" },
    { name: "যোগাযোগ", href: "#contact" },
  ];

  const handleWhatsAppOrder = () => {
    const phone = "8801737451342";
    let message = "আসসালামু আলাইকুম আখি পোল্ট্রি ফার্ম, আমি এই পণ্যগুলো অর্ডার করতে চাই:\n\n";
    cart.forEach((item) => {
      message += `▪ ${item.name} - ${item.quantity}${item.unit} (৳${item.price * item.quantity})\n`;
    });
    message += `\n*মোট: ৳${cartTotal}*\nক্যাশ অন ডেলিভারি।`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-[#0a0a0a] border-b border-white/5 py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-[11px] uppercase tracking-widest text-gray-400 font-medium">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 text-emerald-500" />
              <span>Shibganj, Chapainawabganj</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              <span>Farm Open Now</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="bg-emerald-900/20 px-3 py-1 rounded text-emerald-400 border border-emerald-500/10 flex items-center gap-2">
              <ShieldCheck className="w-3 h-3" /> 100% Halal & Organic
            </div>
            <a href="tel:+8801737451342" className="flex items-center gap-2 hover:text-white transition">
              <Phone className="w-3 h-3 text-yellow-500" /> 01737-451342
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
          isScrolled ? "py-4 px-4" : "py-10 px-4"
        )}
      >
        <div 
          className={cn(
            "max-w-7xl mx-auto px-6 h-20 flex justify-between items-center transition-all duration-500 rounded-[2rem]",
            isScrolled ? "bg-black/60 backdrop-blur-2xl border border-white/10 shadow-2xl scale-[0.98] lg:scale-100" : "bg-transparent"
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-20 group-hover:opacity-60 transition duration-500 rounded-full"></div>
              <div className="w-14 h-14 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-[1.25rem] flex items-center justify-center overflow-hidden relative z-10 group-hover:border-emerald-500/50 transition duration-500 shadow-2xl">
                <img src="/favicon.png" alt="Akhi Poultry Logo" className="w-9 h-9 object-contain group-hover:scale-110 transition duration-500" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none group-hover:text-emerald-400 transition">
                AKHI<span className="text-emerald-500">POULTRY</span>
              </h1>
              <span className="text-[10px] font-bold text-gray-500 tracking-[0.4em] uppercase group-hover:text-emerald-400 transition mt-1">
                Premium Farm
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10">
            <div className="flex gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-6 py-2.5 text-[13px] font-bold text-gray-400 hover:text-white rounded-full transition-all duration-300 hover:bg-white/5 relative group"
                >
                  {link.name}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-emerald-500 group-hover:w-1/2 transition-all duration-300"></span>
                </Link>
              ))}
            </div>

            <div className="h-6 w-px bg-white/10"></div>

            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-3 text-gray-400 hover:text-white transition-all duration-300 bg-white/5 rounded-2xl border border-transparent hover:border-white/10 group"
              >
                <ShoppingBasket className="w-6 h-6 group-hover:scale-110 transition" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center font-black shadow-lg ring-4 ring-[#050505]">
                    {cartCount}
                  </span>
                )}
              </button>

              <Link
                href="/admin"
                className="group relative inline-flex items-center justify-center px-8 py-3.5 overflow-hidden font-bold text-white rounded-[1.25rem] transition-all duration-500 bg-emerald-600 shadow-lg shadow-emerald-900/40 hover:shadow-emerald-500/40 hover:scale-[1.02]"
              >
                <span className="relative text-sm tracking-widest flex items-center gap-2">
                  STAFF LOGIN <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-400"
            >
              <ShoppingBasket className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-400"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-[#0a0a0a] border-b border-white/5 py-6 px-4 md:hidden flex flex-col gap-4"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold text-gray-300 hover:text-emerald-400 transition"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-white/5" />
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-emerald-600/10 text-emerald-400 font-bold border border-emerald-500/20"
              >
                <LayoutDashboard className="w-5 h-5" /> Staff Portal
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[101] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                  <ShoppingBasket className="text-emerald-500" /> আপনার ব্যাগ
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-full transition text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4 hide-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-4">
                    <ShoppingBasket className="w-16 h-16 opacity-10" />
                    <p className="font-bold">আপনার ব্যাগ খালি</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="text-emerald-500 font-bold hover:underline"
                    >
                      কেনাকাটা শুরু করুন
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group"
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden border border-white/10 shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-white truncate">{item.name}</h4>
                          <p className="text-sm text-emerald-400 font-bold">
                            ৳{item.price} / {item.unit}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center bg-black/40 rounded-lg p-1 border border-white/10">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="w-7 h-7 flex items-center justify-center hover:bg-white/10 rounded-md transition text-white"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-bold text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-white/10 rounded-md transition text-white"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto p-2 text-gray-500 hover:text-red-500 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="p-8 border-t border-white/10 bg-black/50 space-y-4">
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">মোট পরিশোধযোগ্য</span>
                    <span className="text-3xl font-black text-white tracking-tighter">৳{cartTotal}</span>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <Link
                      href="/checkout"
                      onClick={() => setIsCartOpen(false)}
                      className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm transition-all shadow-xl shadow-emerald-900/40 flex items-center justify-center gap-2"
                    >
                      অর্ডার করুন <ChevronRight className="w-4 h-4" />
                    </Link>
                    
                    <button
                      onClick={handleWhatsAppOrder}
                      className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black text-sm transition-all flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-500" /> হোয়াটসঅ্যাপে অর্ডার
                    </button>
                  </div>
                  
                  <p className="text-[10px] text-center text-gray-600 font-bold uppercase tracking-widest mt-4">
                    Secure Checkout <span className="mx-1">•</span> Cash on Delivery
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
