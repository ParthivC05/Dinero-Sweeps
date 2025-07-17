import React, { useState } from "react";
import logo from "../assets/logo.png";
import {
  FaCoins,
  FaMoneyBillWave,
  FaUser,
  FaChevronDown,
  FaChevronUp,
  FaUserCircle,
  FaCog,
  FaHome,
  FaStar,
  FaList,
  FaTint,
  FaStore,
  FaQuestionCircle,
  FaThLarge,
  FaCompactDisc,
  FaTicketAlt,
  FaGamepad,
  FaInstagram,
  FaTiktok,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";

const Sidebar = () => {
  const [openSection, setOpenSection] = useState("profile");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <aside
      className="flex flex-col text-white font-sans"
      style={{
        width: 260,
        minHeight: "100vh",
        background: "linear-gradient(180deg, #18111A 0%, #1B0F1A 100%)",
      }}
    >
      <div className="text-center pt-6">
        <img src={logo} alt="Orion Stars Logo" className="w-44 mx-auto mb-6" />
      </div>
      <div
        className="mb-6 mx-4 p-4 border-2 border-yellow-400 rounded-2xl bg-[#18111A]"
        style={{ boxShadow: "0 0 16px 2px #FFD60088" }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="flex items-center gap-2">
            <FaCoins className="text-yellow-400 text-xl" />
            <span className="font-bold text-lg">GC 7,500</span>
          </span>
          <span className="flex items-center gap-2">
            <FaMoneyBillWave className="text-green-300 text-xl" />
            <span className="font-bold text-lg">5.50</span>
          </span>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 font-bold rounded-xl bg-[#C0013A] py-2">
            Get Coins
          </button>
          <button className="flex-1 font-bold rounded-xl bg-[#C0013A] py-2">
            Redeem
          </button>
        </div>
      </div>
      <div className="mx-4 mb-4">
        <button
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 border-yellow-400 text-white font-bold text-lg bg-gradient-to-r from-black via-[#1c0f18] to-black"
          onClick={() => toggleSection("profile")}
        >
          <span className="flex items-center gap-2">
            <FaUser />
            Profile
          </span>
          {openSection === "profile" ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {openSection === "profile" && (
          <ul className="mt-3 space-y-3 pl-2 text-base">
            <li className="flex items-center gap-2 cursor-pointer hover:text-yellow-400">
              <FaUserCircle />
              My Account
            </li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-yellow-400">
              <FaCog />
              Settings
            </li>
          </ul>
        )}
      </div>
      <hr className="border-gray-700 mx-4 mb-4" />
      <div className="mx-4">
        <div className="mb-3 text-pink-400 font-semibold flex items-center gap-2">
          <FaHome />
          Promotions
        </div>
        <ul className="space-y-3 pl-2 text-base mb-4">
          <li className="flex items-center gap-2 cursor-pointer hover:text-yellow-400">
            <FaStar />
            Favourites
          </li>
          <li className="flex items-center gap-2 cursor-pointer hover:text-yellow-400">
            <FaList />
            Task List
          </li>
          <li className="flex items-center gap-2 cursor-pointer hover:text-yellow-400">
            <FaTint />
            Faucet
          </li>
          <li className="flex items-center gap-2 cursor-pointer hover:text-yellow-400">
            <FaStore />
            Stores
          </li>
          <li className="flex items-center gap-2 cursor-pointer hover:text-yellow-400">
            <FaQuestionCircle />
            FAQ
          </li>
        </ul>
      </div>
      <hr className="border-gray-700 mx-4 mb-4" />
      <div className="mx-4">
        <button
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 border-yellow-400 text-white font-bold text-lg bg-gradient-to-r from-black via-[#1c0f18] to-black mb-2"
          onClick={() => toggleSection("provider")}
        >
          <span className="flex items-center gap-2">
            <FaUser />
            Provider
          </span>
          {openSection === "provider" ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {openSection === "provider" && (
          <ul className="space-y-3 pl-2 text-base">
            <li className="flex items-center gap-2 cursor-pointer hover:text-yellow-400">
              <FaThLarge />
              Casino
            </li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-yellow-400">
              <FaThLarge />
              Category
              <FaChevronDown className="ml-auto text-sm" />
            </li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-yellow-400">
              <FaCompactDisc />
              Speen wheel
            </li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-yellow-400">
              <FaTicketAlt />
              Tickets
            </li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-yellow-400">
              <FaGamepad />
              Responsible Gaming
            </li>
          </ul>
        )}
      </div>
      <div className="mt-auto pt-6 pb-6 flex justify-center gap-4">
        {[FaInstagram, FaTiktok, FaFacebook, FaTwitter].map((Icon, idx) => (
          <a
            key={idx}
            href="#"
            className="bg-white rounded-xl p-2 flex items-center justify-center"
            style={{ width: 44, height: 44 }}
          >
            <Icon className="text-black text-xl" />
          </a>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
