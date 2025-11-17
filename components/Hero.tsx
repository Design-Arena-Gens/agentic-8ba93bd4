"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Info } from "lucide-react";
import { Movie } from "@/types/movie";
import Image from "next/image";

interface HeroProps {
  movies: Movie[];
}

export default function Hero({ movies }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const movie = movies[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [movies.length]);

  if (!movie) return null;

  return (
    <div className="relative h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="relative h-full w-full">
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
          </div>

          <div className="absolute bottom-1/4 left-4 md:left-12 max-w-2xl space-y-4 md:space-y-6">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-7xl font-bold"
            >
              {movie.title}
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm md:text-lg text-gray-200 line-clamp-3"
            >
              {movie.overview}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4"
            >
              <button className="flex items-center gap-2 bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded hover:bg-white/90 transition-all font-semibold">
                <Play className="w-5 h-5 md:w-6 md:h-6 fill-current" />
                <span className="text-sm md:text-base">Play</span>
              </button>
              <button className="flex items-center gap-2 bg-gray-500/70 text-white px-6 md:px-8 py-2 md:py-3 rounded hover:bg-gray-500/50 transition-all font-semibold">
                <Info className="w-5 h-5 md:w-6 md:h-6" />
                <span className="text-sm md:text-base">More Info</span>
              </button>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-2 items-center"
            >
              <span className="text-green-500 font-semibold">{Math.round(movie.vote_average * 10)}% Match</span>
              <span className="border border-gray-400 px-2 py-0.5 text-xs">
                {movie.adult ? "18+" : "PG-13"}
              </span>
              <span className="text-gray-400">{movie.release_date?.split("-")[0]}</span>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 right-4 md:right-12 flex gap-2 z-10">
        {movies.slice(0, 5).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1 transition-all ${
              index === currentIndex ? "w-8 bg-white" : "w-4 bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
