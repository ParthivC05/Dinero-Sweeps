import React from "react";
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

const GameList = () => (
  <main className="flex-grow-1 p-4" style={{ background: "#000", minHeight: "100vh" }}>
    {/* Search Bar */}
    {/* <div className="mb-3 d-flex align-items-center">
      <input
        type="text"
        className="form-control bg-dark text-white border-0 rounded-pill px-4"
        placeholder="Search Games and Game Providers"
        style={{ maxWidth: 350 }}
      />
    </div> */}
    {/* Slider */}
    <div className="mb-4">
      <div id="bannerCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2500">
        <div className="carousel-inner rounded">
          {slides.map((slideImgs, idx) => (
            <div className={`carousel-item${idx === 0 ? " active" : ""}`} key={idx}>
              <div className="d-flex gap-3">
                {slideImgs.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    className="d-block rounded"
                    alt={`Banner ${idx * 2 + i + 1}`}
                    style={{ width: "50%", height: 180, objectFit: "cover" }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    {/* Category Tabs */}
    <div className="mb-3 d-flex gap-2 align-items-center">
      {categories.map((cat) => (
        <button key={cat} className="btn btn-sm btn-outline-light rounded-pill px-3">{cat}</button>
      ))}
    </div>
    {/* Game Sections */}
    {gameSections.map((section) => (
      <div className="mb-5" key={section}>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="text-white mb-0">{section}</h5>
          <button className="btn btn-link text-pink fw-bold">See All</button>
        </div>
        <div className="row g-3">
          {games.map((game, idx) => (
            <div className="col-6 col-md-3 col-lg-2" key={idx}>
              <div className="card bg-dark text-white border-0">
                <img src={game.img} alt={game.name} className="card-img-top rounded" />
                
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </main>
);

export default GameList; 