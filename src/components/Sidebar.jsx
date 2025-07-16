import React, { useState } from "react";
import logo from "../assets/logo.png";
import "bootstrap-icons/font/bootstrap-icons.css";

const Sidebar = () => {
  const [openSection, setOpenSection] = useState("profile");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <aside
      className="sidebar text-white d-flex flex-column"
      style={{
        width: 260,
        minHeight: "100vh",
        background: "linear-gradient(180deg, #18111A 0%, #1B0F1A 100%)",
        boxShadow: "2px 0 16px #0008",
      }}
    >
      <div className="mb-4 text-center pt-4">
        <img src={logo} alt="Orion Stars Logo" style={{ width: 180, marginBottom: 16 }} />
      </div>
      <div
        className="mb-3 mx-3 p-3"
        style={{
          border: "2px solid #FFD600",
          borderRadius: 16,
          boxShadow: "0 0 16px 2px #FFD60088",
          background: "#18111A",
        }}
      >
        <div className="d-flex align-items-center justify-content-between mb-2">
          <span>
            <i className="bi bi-coin" style={{ color: "#FFD600", fontSize: 22, marginRight: 6 }} />
            <span className="fw-bold" style={{ fontSize: 18 }}>GC 7,500</span>
          </span>
          <span>
            <i className="bi bi-cash-stack" style={{ color: "#7FFFAB", fontSize: 22, marginRight: 6 }} />
            <span className="fw-bold" style={{ fontSize: 18 }}>$5.50</span>
          </span>
        </div>
        <div className="d-flex gap-2">
          <button
            className="btn fw-bold"
            style={{
              background: "linear-gradient(90deg, #FF4E9B 0%, #FFD600 100%)",
              color: "#fff",
              borderRadius: 12,
              flex: 1,
            }}
          >
            Get Coins
          </button>
          <button
            className="btn fw-bold"
            style={{
              border: "1.5px solid #FFD600",
              color: "#fff",
              borderRadius: 12,
              flex: 1,
              background: "transparent",
            }}
          >
            Redeem
          </button>
        </div>
      </div>

      <div className="mx-3 mb-2">
        <button
          className="w-100 d-flex align-items-center justify-content-between px-3 py-2"
          style={{
            background: "linear-gradient(90deg, #FF4E9B 0%, #FFD600 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            fontWeight: 600,
            fontSize: 18,
            transition: "background 0.2s",
          }}
          onClick={() => toggleSection("profile")}
        >
          <span>
            <i className="bi bi-person-fill me-2" />
            Profile
          </span>
          <i
            className={`bi bi-chevron-${openSection === "profile" ? "up" : "down"}`}
            style={{ transition: "transform 0.2s", transform: openSection === "profile" ? "rotate(0deg)" : "rotate(180deg)" }}
          />
        </button>
        {openSection === "profile" && (
          <ul className="list-unstyled mt-2 mb-0">
            <li><span className="sidebar-link"><i className="bi bi-person-circle me-2" />My Account</span></li>
            <li><span className="sidebar-link"><i className="bi bi-gear me-2" />Settings</span></li>
          </ul>
        )}
      </div>

      <hr className="border-secondary mx-3" />

      <div className="mx-3">
        <div className="fw-bold mb-2" style={{ color: "#FF4E9B" }}>
          <i className="bi bi-house-door-fill me-2" />
          Promotions
        </div>
        <ul className="list-unstyled mb-3">
          <li><span className="sidebar-link"><i className="bi bi-star me-2" />Favourites</span></li>
          <li><span className="sidebar-link"><i className="bi bi-list-task me-2" />Task List</span></li>
          <li><span className="sidebar-link"><i className="bi bi-droplet-half me-2" />Faucet</span></li>
          <li><span className="sidebar-link"><i className="bi bi-shop me-2" />Stores</span></li>
          <li><span className="sidebar-link"><i className="bi bi-question-circle me-2" />FAQ</span></li>
        </ul>
      </div>

      <hr className="border-secondary mx-3" />

      <div className="mx-3">
        <button
          className="w-100 d-flex align-items-center justify-content-between px-3 py-2 mb-2"
          style={{
            background: "linear-gradient(90deg, #FF4E9B 0%, #FFD600 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            fontWeight: 600,
            fontSize: 18,
            transition: "background 0.2s",
          }}
          onClick={() => toggleSection("provider")}
        >
          <span>
            <i className="bi bi-person-fill me-2" />
            Provider
          </span>
          <i
            className={`bi bi-chevron-${openSection === "provider" ? "up" : "down"}`}
            style={{ transition: "transform 0.2s", transform: openSection === "provider" ? "rotate(0deg)" : "rotate(180deg)" }}
          />
        </button>
        {openSection === "provider" && (
          <ul className="list-unstyled">
            <li><span className="sidebar-link"><i className="bi bi-slot me-2" />Casino</span></li>
            <li><span className="sidebar-link"><i className="bi bi-grid-3x3-gap me-2" />Category <i className="bi bi-chevron-down ms-1" /></span></li>
            <li><span className="sidebar-link"><i className="bi bi-record-circle me-2" />Speen wheel</span></li>
            <li><span className="sidebar-link"><i className="bi bi-ticket-perforated me-2" />Tickets</span></li>
            <li><span className="sidebar-link"><i className="bi bi-controller me-2" />Responsible Gaming</span></li>
          </ul>
        )}
      </div>

      <div className="mt-auto pt-3 pb-4 d-flex justify-content-center gap-2">
        <a href="#" className="bg-white rounded p-2 d-flex align-items-center justify-content-center" style={{ width: 38, height: 38 }}>
          <i className="bi bi-instagram" style={{ color: "#18111A", fontSize: 22 }} />
        </a>
        <a href="#" className="bg-white rounded p-2 d-flex align-items-center justify-content-center" style={{ width: 38, height: 38 }}>
          <i className="bi bi-tiktok" style={{ color: "#18111A", fontSize: 22 }} />
        </a>
        <a href="#" className="bg-white rounded p-2 d-flex align-items-center justify-content-center" style={{ width: 38, height: 38 }}>
          <i className="bi bi-facebook" style={{ color: "#18111A", fontSize: 22 }} />
        </a>
        <a href="#" className="bg-white rounded p-2 d-flex align-items-center justify-content-center" style={{ width: 38, height: 38 }}>
          <i className="bi bi-x" style={{ color: "#18111A", fontSize: 22 }} />
        </a>
      </div>
    </aside>
  );
};

export default Sidebar; 