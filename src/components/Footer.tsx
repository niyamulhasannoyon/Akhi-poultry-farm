"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { 
  ShoppingBasket, 
  Mail, 
  Phone, 
  MapPin,
  ArrowUpRight
} from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    { Icon: FaFacebook, href: "#", color: "hover:bg-blue-600" },
    { Icon: FaInstagram, href: "#", color: "hover:bg-pink-600" },
    { Icon: FaTwitter, href: "#", color: "hover:bg-sky-500" },
  ];
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-32 pb-12 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute bottom-0 left-0 w-full h-96 bg-emerald-500/5 blur-[120px] rounded-full translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-32">
          {/* Brand */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl group-hover:border-emerald-500/50 transition duration-500 overflow-hidden">
                <img src="/favicon.png" alt="Logo" className="w-8 h-8 object-contain" />
              </div>
              <h1 className="text-2xl font-black text-white tracking-tighter">
                AKHI<span className="text-emerald-500">POULTRY</span>
              </h1>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-medium">
              শিবগঞ্জ এলাকায় শতভাগ হালাল এবং স্বাস্থ্যসম্মত উপায়ে পোল্ট্রি সমাধানের বিশ্বস্ত নাম। গুণগত মানই আমাদের প্রথম লক্ষ্য।
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ Icon, href, color }, idx) => (
                <a 
                  key={idx} 
                  href={href} 
                  className={cn(
                    "w-12 h-12 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-500 transition-all duration-500 hover:text-white hover:scale-110",
                    color
                  )}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="space-y-8">
            <h3 className="text-white font-black text-xs uppercase tracking-[0.3em]">Quick Links</h3>
            <ul className="space-y-5">
              {["হোম", "আমাদের সম্পর্কে", "সেবাসমূহ", "যোগাযোগ"].map((link) => (
                <li key={link}>
                  <Link href={`#${link}`} className="text-gray-500 hover:text-emerald-400 text-sm transition-all duration-300 flex items-center gap-2 group font-medium">
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" /> {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-8">
            <h3 className="text-white font-black text-xs uppercase tracking-[0.3em]">Contact Us</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-gray-500 text-sm font-medium">
                <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>জালমাছমারি, শিবগঞ্জ, চাঁপাইনবাবগঞ্জ</span>
              </li>
              <li className="flex items-center gap-4 text-gray-500 text-sm font-medium">
                <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>01737-451342</span>
              </li>
              <li className="flex items-center gap-4 text-gray-500 text-sm font-medium">
                <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>info@akhipoultry.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-8">
            <h3 className="text-white font-black text-xs uppercase tracking-[0.3em]">Newsletter</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">সব অফার সম্পর্কে জানতে সাবস্ক্রাইব করুন।</p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="আপনার ইমেইল..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-5 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.05] transition-all duration-500"
              />
              <button className="absolute right-2 top-2 bottom-2 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest transition-all duration-500">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8 text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">
          <p>© {new Date().getFullYear()} AKHI POULTRY FARM <span className="mx-2 text-white/10">|</span> EST. 2020</p>
          <div className="flex gap-12">
            <a href="#" className="hover:text-white transition-colors duration-300">Privacy</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Terms</a>
          </div>
          <p>DESIGNED BY <span className="text-white group hover:text-emerald-500 transition-colors cursor-pointer">NIYAMUL HASAN</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
