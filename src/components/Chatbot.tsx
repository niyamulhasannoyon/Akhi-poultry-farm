"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, RotateCcw } from "lucide-react";

interface Message {
  role: "bot" | "user";
  content: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "আসসালামু আলাইকুম! আপনাকে কীভাবে সাহায্য করতে পারি?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const responses: Record<string, string> = {
    price: "আজকের দর:\n• সোনালী রোস্ট: ৳৩৪০/কেজি\n• সোনালী লাইভ: ৳৩২০/কেজি\n• ব্রয়লার: ৳১৮০/কেজি\n• ফিড: শুরু ৳৩৩০০/ব্যাগ থেকে।",
    location: "আমাদের অবস্থান: **জালমাছমারি, শিবগঞ্জ, চাঁপাইনবাবগঞ্জ**। আপনি আমাদের খামারে আমন্ত্রিত!",
    delivery: "আমরা শিবগঞ্জ সদর এলাকায় **হোম ডেলিভারি** দিয়ে থাকি। \n• ১০ কেজির বেশি অর্ডারে ডেলিভারি ফ্রি।\n• সাধারণত ২ ঘন্টার মধ্যে ডেলিভারি করা হয়।",
    contact: "আমাদের সাথে সরাসরি যোগাযোগ করুন: **01737-451342** নাম্বারে।",
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setIsTyping(true);

    // Simulate thinking
    setTimeout(() => {
      setIsTyping(false);
      let reply = "আমি ঠিক বুঝতে পারছি না। সরাসরি কল করুন 01737-451342 নাম্বারে।";
      
      const lowerText = text.toLowerCase();
      if (lowerText.includes("দাম") || lowerText.includes("দর") || lowerText.includes("price")) reply = responses.price;
      if (lowerText.includes("ঠিকানা") || lowerText.includes("কোথায়") || lowerText.includes("location")) reply = responses.location;
      if (lowerText.includes("ডেলিভারি") || lowerText.includes("delivery")) reply = responses.delivery;
      if (lowerText.includes("নাম্বার") || lowerText.includes("contact")) reply = responses.contact;
      if (lowerText.includes("সালাম") || lowerText.includes("হ্যালো")) reply = "ওয়ালাইকুম আসসালাম! কেমন আছেন?";

      setMessages((prev) => [...prev, { role: "bot", content: reply }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="absolute bottom-20 right-0 w-80 md:w-96 glass-dark rounded-[2rem] shadow-2xl border border-white/10 overflow-hidden flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="p-6 bg-emerald-600/10 border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Akhi AI Assistant</h4>
                  <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setMessages([{ role: "bot", content: "আসসালামু আলাইকুম! আপনাকে কীভাবে সাহায্য করতে পারি?" }])}
                  className="p-2 hover:bg-white/5 rounded-full transition text-gray-500"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-full transition text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 hide-scrollbar"
            >
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                    msg.role === "user" 
                      ? "bg-emerald-600 text-white rounded-tr-none" 
                      : "bg-white/5 text-gray-200 border border-white/5 rounded-tl-none"
                  }`}>
                    {msg.content.split("\n").map((line, i) => (
                      <p key={i} className={i > 0 ? "mt-1" : ""}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce delay-150"></span>
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce delay-300"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Replies */}
            <div className="p-4 flex gap-2 overflow-x-auto hide-scrollbar border-t border-white/5">
              {["মুরগির দাম", "লোকেশন", "ডেলিভারি", "যোগাযোগ"].map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-xs text-gray-400 hover:text-white hover:border-emerald-500/50 transition whitespace-nowrap"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <form 
              className="p-4 bg-black/40 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
            >
              <input
                type="text"
                placeholder="বার্তা লিখুন..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
              />
              <button 
                type="submit"
                className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-900/40"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-3xl bg-emerald-600 text-white flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:shadow-[0_0_60px_rgba(16,185,129,0.6)] transition-all relative"
      >
        {isOpen ? <X className="w-7 h-7" /> : <MessageSquare className="w-7 h-7" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-[#050505] rounded-full"></span>
        )}
      </motion.button>
    </div>
  );
};

export default Chatbot;
