
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/50 backdrop-blur-md border-b border-white/5"
    >
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg" 
            alt="HeliosAI Logo"
            width={120}
            height={40}
            className="h-10 w-auto object-contain"
          />
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <button className="hidden md:block px-4 py-2 text-xs font-mono font-bold text-black bg-[#FDB813] hover:bg-[#ffc636] transition-colors rounded-sm uppercase tracking-wider">
           Dashboard Access
        </button>
      </div>
    </motion.header>
  );
}

