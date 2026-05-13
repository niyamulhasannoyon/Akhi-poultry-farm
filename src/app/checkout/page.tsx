"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ShoppingBag, User, Phone, MapPin, ChevronLeft, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";

const CheckoutPage = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const DELIVERY_CHARGE = 120;
  const finalTotal = cartTotal + DELIVERY_CHARGE;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    area: "Shibganj",
  });

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6">
        <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6 border border-white/10">
          <ShoppingBag className="w-10 h-10 text-emerald-500" />
        </div>
        <h2 className="text-2xl font-black text-white mb-4">আপনার কার্ট খালি</h2>
        <Link href="/" className="px-8 py-3 bg-emerald-600 rounded-xl text-white font-bold">
          কেনাকাটা শুরু করুন
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        customer: formData,
        items: cart,
        subtotal: cartTotal,
        deliveryCharge: DELIVERY_CHARGE,
        total: finalTotal,
        status: "PENDING",
        createdAt: serverTimestamp(),
        paymentMethod: "CASH_ON_DELIVERY",
      };

      const docRef = await addDoc(collection(db, "orders"), orderData);
      setOrderId(docRef.id);
      setIsSuccess(true);
      clearCart();
      toast.success("অর্ডার সফল হয়েছে!");
    } catch (error: any) {
      console.error("Order Error Detailed:", {
        message: error.message,
        code: error.code,
        stack: error.stack,
        fullError: error
      });
      toast.error(`অর্ডার করতে সমস্যা হয়েছে: ${error.message || "আবার চেষ্টা করুন"}`);
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
        <div className="max-w-md w-full glass p-10 rounded-[3rem] text-center space-y-8 border-white/10 shadow-2xl">
          <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(16,185,129,0.3)] animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-white tracking-tighter">অর্ডার সফল!</h2>
            <p className="text-gray-400 font-medium">আপনার অর্ডারটি গ্রহণ করা হয়েছে। অর্ডার আইডি: <span className="text-emerald-500 font-bold">#{orderId.slice(-6).toUpperCase()}</span></p>
            <p className="text-sm text-gray-500">আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব। মোট প্রদেয়: <span className="text-white font-bold">৳{finalTotal}</span></p>
          </div>
          <Link 
            href="/" 
            className="block w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-emerald-900/40"
          >
            হোমে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Checkout Form */}
        <div className="space-y-10">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-all font-bold text-sm">
            <ChevronLeft className="w-4 h-4" /> কেনাকাটা চালিয়ে যান
          </Link>
          
          <div className="space-y-4">
            <h1 className="text-5xl font-black text-white tracking-tighter">চেকআউট</h1>
            <p className="text-gray-500 font-medium">অর্ডার সম্পন্ন করতে নিচের তথ্যগুলো পূরণ করুন</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-500">পূর্ণ নাম</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    required
                    type="text"
                    placeholder="আপনার নাম"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-500">মোবাইল নাম্বার</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    required
                    type="tel"
                    placeholder="017XXXXXXXX"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-500">ডেলিভারি ঠিকানা</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 w-4 h-4 text-gray-500" />
                  <textarea
                    required
                    rows={3}
                    placeholder="গ্রাম, রাস্তা, ইউনিয়ন..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl space-y-2">
              <h4 className="text-white font-bold text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> ক্যাশ অন ডেলিভারি
              </h4>
              <p className="text-xs text-gray-500">পণ্য হাতে পাওয়ার পর মূল্য পরিশোধ করুন। বর্তমানে শুধুমাত্র এই সার্ভিসটি চালু আছে।</p>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-emerald-900/40 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>অর্ডার সম্পন্ন করুন <ChevronLeft className="w-5 h-5 rotate-180" /></>}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:sticky lg:top-32 h-fit space-y-8">
          <div className="premium-card p-10 bg-black/40 backdrop-blur-3xl border-white/5">
            <h3 className="text-2xl font-black text-white mb-8 tracking-tight">আপনার অর্ডার</h3>
            <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-4 hide-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm leading-tight">{item.name}</h4>
                      <p className="text-gray-500 text-xs mt-1">৳{item.price} x {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-white font-bold text-sm whitespace-nowrap">৳{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-8 border-t border-white/5">
              <div className="flex justify-between text-gray-500 text-sm font-bold">
                <span>সাব-টোটাল</span>
                <span>৳{cartTotal}</span>
              </div>
              <div className="flex justify-between text-gray-500 text-sm font-bold">
                <span>ডেলিভারি চার্জ</span>
                <span className="text-white">৳{DELIVERY_CHARGE}</span>
              </div>
              <div className="flex justify-between text-white text-2xl font-black pt-4">
                <span>মোট</span>
                <span className="text-emerald-500">৳{finalTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
