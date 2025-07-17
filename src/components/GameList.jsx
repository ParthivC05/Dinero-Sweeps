import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import slider1 from "../assets/slider1.png";
import slider2 from "../assets/slider2.png";
import game1 from '../assets/game1.png';
import game2 from '../assets/game2.png';
import game3 from '../assets/game3.png';
import game4 from '../assets/game4.png';
import game5 from '../assets/game5.png';

const categories = [
  "Promotions", "Gameplay", "Gameway", "Net Gaming", "Tada Gaming", "Hacksaw gaming"
];

const gameSections = [
  "Slots", "Scratchcards", "Keno", "Fishing", "Scratch-card", "Shooting", "Crash game", "Bingo"
];

const games = [
  { name: "Game 1", img: game1 },
  { name: "Game 2", img: game2 },
  { name: "Game 3", img: game3 },
  { name: "Game 4", img: game4 },
  { name: "Game 5", img: game5 },
];

const sliderImages = [slider1, slider2, slider2, slider1];

const getSlides = (images, perSlide = 2) => {
  const slides = [];
  for (let i = 0; i < images.length; i += perSlide) {
    slides.push(images.slice(i, i + perSlide));
  }
  return slides;
};

const slides = getSlides(sliderImages, 2);

const AUTO_SLIDE_INTERVAL = 2500;

const GameList = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    timeoutRef.current = setInterval(nextSlide, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(timeoutRef.current);
  }, [current]);

  return (
    <main className="flex-1 p-4 bg-black min-h-screen">
      <div className="flex items-center justify-between mb-8 gap-4">
        <div className="flex-1 max-w-xl flex items-center bg-[#232224] rounded-lg px-4 py-2">
          <FaSearch className="text-gray-400 mr-3 text-lg" />
          <input
            type="text"
            placeholder="Search Games and Game Providers"
            className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-400 text-base"
          />
        </div>
        <button className="relative bg-gradient-to-b from-[#C0013A] to-[#A8002F] text-white font-medium rounded-lg px-8 py-2 text-lg shadow-md hover:brightness-110 transition-all">
          <span className="absolute -top-2 left-3 w-4 h-4 bg-white rounded-t-md rotate-45" style={{clipPath:'polygon(0 0,100% 0,100% 100%)'}}></span>
          <span className="relative z-10">Get Coins</span>
        </button>
      </div>
      <div className="mb-6 relative max-w-2xl mx-auto">
        <div className="overflow-hidden rounded-lg">
          <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${current * 100}%)` }}>
            {slides.map((slideImgs, idx) => (
              <div key={idx} className="flex gap-4 min-w-full justify-center">
                {slideImgs.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Banner ${idx * 2 + i + 1}`}
                    className="rounded-lg object-cover h-44 w-1/2"
                    style={{ minWidth: 180 }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 hover:bg-black/80 z-10"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          &#8592;
        </button>
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 hover:bg-black/80 z-10"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          &#8594;
        </button>
        <div className="flex justify-center gap-2 mt-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`w-2 h-2 rounded-full ${current === idx ? 'bg-pink-500' : 'bg-gray-500'}`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="mb-6 flex gap-2 items-center flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            className="px-4 py-2 rounded-full border border-gray-600 text-white text-sm hover:bg-pink-500 hover:text-white transition"
          >
            {cat}
          </button>
        ))}
      </div>
      {gameSections.map((section) => (
        <div className="mb-10" key={section}>
          <div className="flex justify-between items-center mb-3">
            <h5 className="text-white text-lg font-semibold">{section}</h5>
            <button className="text-pink-400 font-bold text-sm hover:underline">See All</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {games.map((game, idx) => (
              <div key={idx} className="bg-gray-900 rounded-lg overflow-hidden shadow hover:shadow-pink-400/30 transition">
                <img src={game.img} alt={game.name} className="w-full h-32 object-cover rounded-t-lg" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
};

export default GameList; 