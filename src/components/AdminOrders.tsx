"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Truck, 
  Phone, 
  MapPin, 
  User,
  Trash2,
  ChevronRight,
  Loader2
} from "lucide-react";
import toast from "react-hot-toast";

interface Order {
  id: string;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  items: any[];
  total: number;
  status: "PENDING" | "PROCESSING" | "CONFIRMED" | "CANCELLED" | "PAID";
  createdAt: any;
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];
      setOrders(ordersData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "orders", orderId), { status: newStatus });
      toast.success(`অর্ডার স্ট্যাটাস ${newStatus} করা হয়েছে`);
    } catch (error) {
      toast.error("স্ট্যাটাস আপডেট ব্যর্থ হয়েছে");
    }
  };

  const deleteOrder = async (orderId: string) => {
    if (!confirm("আপনি কি নিশ্চিতভাবে এই অর্ডারটি ডিলিট করতে চান?")) return;
    try {
      await deleteDoc(doc(db, "orders", orderId));
      toast.success("অর্ডার ডিলিট করা হয়েছে");
    } catch (error) {
      toast.error("ডিলিট ব্যর্থ হয়েছে");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "PROCESSING": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "CONFIRMED": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "PAID": return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "CANCELLED": return "bg-red-500/10 text-red-500 border-red-500/20";
      default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="w-10 h-10 text-emerald-500 animate-spin" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-white tracking-tight">অর্ডার ম্যানেজমেন্ট</h2>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-xs font-bold text-gray-400">
          মোট অর্ডার: <span className="text-emerald-500">{orders.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {orders.length === 0 ? (
          <div className="premium-card p-20 text-center text-gray-500">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-5" />
            <p className="font-bold">বর্তমানে কোনো অর্ডার নেই</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="premium-card overflow-hidden group">
              {/* Header */}
              <div className="p-6 border-b border-white/5 bg-white/[0.02] flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${getStatusColor(order.status)}`}>
                    {order.status}
                  </div>
                  <span className="text-gray-500 text-xs font-bold tracking-widest">ID: #{order.id.slice(-6).toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <select 
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="PROCESSING">PROCESSING</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="PAID">PAID</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                  <button 
                    onClick={() => deleteOrder(order.id)}
                    className="p-2 bg-red-500/10 text-red-500 rounded-lg border border-red-500/20 hover:bg-red-500 transition-all hover:text-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Customer Info */}
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <User className="w-3 h-3" /> কাস্টমার তথ্য
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-500">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">{order.customer.name}</p>
                        <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Name</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-500">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">{order.customer.phone}</p>
                        <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Phone</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-yellow-500 shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm leading-relaxed">{order.customer.address}</p>
                        <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-1">Address</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-6 lg:col-span-2">
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <ShoppingBag className="w-3 h-3" /> অর্ডার ডিটেইলস
                  </h4>
                  <div className="grid grid-cols-1 gap-3 max-h-[200px] overflow-y-auto pr-4 hide-scrollbar">
                    {order.items.map((item: any, i: number) => (
                      <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="flex items-center gap-4">
                          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover border border-white/10" />
                          <div>
                            <p className="text-white font-bold text-sm">{item.name}</p>
                            <p className="text-emerald-500 text-[10px] font-black tracking-widest">৳{item.price} x {item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-white font-black text-sm">৳{item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3 pt-6 border-t border-white/5">
                    <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                      <span>সাব-টোটাল</span>
                      <span>৳{order.subtotal || order.total - 120}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                      <span>ডেলিভারি চার্জ</span>
                      <span>৳{order.deliveryCharge || 120}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-gray-400 font-bold">মোট পরিশোধযোগ্য</span>
                      <span className="text-3xl font-black text-white tracking-tighter">৳{order.total}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
