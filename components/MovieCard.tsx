"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Plus, ThumbsUp, ChevronDown } from "lucide-react";
import { Movie } from "@/types/movie";
import Image from "next/image";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const qualities = ["4K", "HD", "SD"];
  const randomQuality = qualities[Math.floor(Math.random() * qualities.length)];

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative min-w-[200px] md:min-w-[280px] cursor-pointer"
    >
      <motion.div
        layout
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1, zIndex: 50 }}
        transition={{ duration: 0.3 }}
        className="relative aspect-video rounded overflow-hidden"
      >
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
          alt={movie.title}
          fill
          className="object-cover"
        />

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
            >
              <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
                <h3 className="font-semibold text-sm md:text-base line-clamp-1">
                  {movie.title}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-white/90"
                    >
                      <Play className="w-4 h-4 text-black fill-current" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white"
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white"
                    >
                      <ThumbsUp className="w-4 h-4" />
                    </motion.button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.button>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-green-500 font-semibold">
                    {Math.round(movie.vote_average * 10)}% Match
                  </span>
                  <span className="border border-gray-400 px-1.5 py-0.5">
                    {movie.adult ? "18+" : "PG-13"}
                  </span>
                  <span className="border border-gray-400 px-1.5 py-0.5">
                    {randomQuality}
                  </span>
                </div>

                <div className="flex gap-2 text-xs text-gray-400">
                  {movie.release_date && (
                    <span>{movie.release_date.split("-")[0]}</span>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
