"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Bell, User } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-netflix-black" : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-12 py-4">
        <div className="flex items-center gap-8">
          <motion.h1
            whileHover={{ scale: 1.05 }}
            className="text-netflix-red text-3xl font-bold cursor-pointer"
          >
            NETFLIX
          </motion.h1>

          <ul className="hidden md:flex gap-6 text-sm">
            {["Home", "TV Shows", "Movies", "New & Popular", "My List"].map((item) => (
              <motion.li
                key={item}
                whileHover={{ color: "#b3b3b3" }}
                className="cursor-pointer transition-colors"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-6">
          <Search className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors" />
          <Bell className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors" />
          <div className="w-8 h-8 bg-netflix-red rounded flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
