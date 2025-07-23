import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaPlay, FaRegSmile } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import slider1 from "../assets/slider1.png";
import slider2 from "../assets/slider2.png";
import Loader from "./Loader";

const categories = [
  "Promotions", "Gameplay", "Gameway", "Net Gaming", "Tada Gaming", "Hacksaw gaming"
];

const gameSections = [
  "Slots", "Scratchcards", "Keno", "Fishing", "Scratch-card", "Shooting", "Crash game", "Bingo"
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

const isLoggedIn = () => {
  return !!localStorage.getItem('authToken');
};

const GameList = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const navigate = useNavigate();

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    timeoutRef.current = setInterval(nextSlide, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(timeoutRef.current);
  }, [current]);

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_BASE_URL}/games`)
      .then(res => res.json())
      .then(data => {
        setGames((data.games || []).slice(0, 12));
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load games");
        setLoading(false);
      });
  }, []);

  const handleLaunch = async (gameId, mode) => {
    if (mode === 'real' && !isLoggedIn()) {
      alert('You must be logged in to play for real. Please log in or sign up.');
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/games/launch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ gameId, mode }),
      });
      const data = await res.json();
      if (data.url) window.open(data.url, "_blank");
      else alert(data.error || "Failed to launch game");
    } catch (err) {
      alert("Failed to launch game");
    }
  };

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
        <button
          className="relative bg-gradient-to-b from-[#C0013A] to-[#A8002F] text-white font-medium rounded-lg px-8 py-2 text-lg shadow-md hover:brightness-110 transition-all"
          onClick={() => navigate('/get-coins')}
        >
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
      {loading ? (
        <div className="text-white text-center py-10"><Loader /></div>
      ) : error ? (
        <div className="text-red-400 text-center py-10">{error}</div>
      ) : gameSections.map((section) => (
        <div className="mb-10" key={section}>
          <div className="flex justify-between items-center mb-3">
            <h5 className="text-white text-lg font-semibold">{section}</h5>
            <button className="text-pink-400 font-bold text-sm hover:underline">See All</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {games.map((game, idx) => {
              const imageSrc =
                game.thumbnail_url ||
                game.more_details?.media?.icon ||
                game.more_details?.media?.thumbnails?.["250x180"] ||
                game.more_details?.media?.thumbnails?.["500x360"] ||
                "";
              return (
                <div
                  key={idx}
                  className="bg-gray-900 rounded-lg overflow-hidden shadow hover:shadow-pink-400/30 transition relative flex flex-col items-center group"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <img
                    src={imageSrc}
                    alt={game.name}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <div className="p-2 text-white text-center font-semibold">{game.name}</div>
                  {hoveredIdx === idx && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity group-hover:opacity-100 opacity-100 gap-4">
                      <button
                        className="flex flex-col items-center group/play"
                        title="Fun Play"
                        onClick={e => {
                          e.stopPropagation();
                          handleLaunch(game.casino_game_id, 'fun');
                        }}
                      >
                        <FaRegSmile className="text-white text-3xl mb-1 group-hover/play:text-yellow-300" />
                        <span className="text-xs text-white">Demo</span>
                      </button>
                      <button
                        className="flex flex-col items-center group/play"
                        title={isLoggedIn() ? "Real Play" : "Login required"}
                        disabled={!isLoggedIn()}
                        style={{ opacity: isLoggedIn() ? 1 : 0.5, cursor: isLoggedIn() ? 'pointer' : 'not-allowed' }}
                        onClick={e => {
                          e.stopPropagation();
                          handleLaunch(game.casino_game_id, 'real');
                        }}
                      >
                        <FaPlay className="text-white text-3xl mb-1 group-hover/play:text-green-400" />
                        <span className="text-xs text-white">Real</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </main>
  );
};

export default GameList; 