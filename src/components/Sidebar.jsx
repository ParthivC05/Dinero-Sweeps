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
  FaTint,
  FaQuestionCircle,
  FaTicketAlt,
  FaGamepad,
  FaInstagram,
  FaTiktok,
  FaFacebook,
  FaTwitter,
  FaGift,
  FaUsers,
  FaComments,
  FaHeadset,
  FaDice,
  FaHeart,
  FaBars,
  FaTimes,
  FaBell,
  FaCrown,
  FaUserFriends,
  FaExchangeAlt,
  FaShareAlt,
} from "react-icons/fa";
import { GiSpade } from "react-icons/gi";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [openSection, setOpenSection] = useState("profile");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationItems = [
    {
      id: "profile",
      title: "Profile",
      icon: FaUser,
      hasNotifications: true,
      subItems: [
        { title: "My Info", icon: FaUserCircle, path: "/profile/my-info" },
        { title: "Settings", icon: FaCog, path: "/profile/settings/verify-profile" },
        { title: "Notifications", icon: FaBell, path: "/notifications" },
        { title: "VIP", icon: FaCrown, path: "/vip" },
        { title: "Affiliate", icon: FaUserFriends, path: "/affiliate" },
        { title: "Transaction", icon: FaExchangeAlt, path: "/transaction" },
        { title: "Share", icon: FaShareAlt, path: "/share" },
      ]
    },
    {
      id: "promotions",
      title: "Promotions",
      icon: FaGift,
      hasNotifications: true,
      path: "/promotions"
    },
    {
      id: "faucet",
      title: "Faucet",
      icon: FaTint,
      path: "/faucet"
    },
    {
      id: "gameCategories",
      title: "Game Categories",
      icon: FaGamepad,
      subItems: [
        { title: "Slots", icon: FaDice, path: "/games/slots" },
        { title: "Table Games", icon: GiSpade, path: "/games/table" },
        { title: "Scratch Cards", icon: FaTicketAlt, path: "/games/scratch" },
        { title: "Lottery", icon: FaTicketAlt, path: "/games/lottery" },
        { title: "Poker", icon: GiSpade, path: "/games/poker" },
      ]
    },
    {
      id: "socialFeatures",
      title: "Social Features",
      icon: FaUsers,
      subItems: [
        { title: "Social Casino", icon: FaGamepad, path: "/social-casino" },
        { title: "Invite Friends", icon: FaUsers, path: "/invite" },
        { title: "Live Games", icon: FaComments, path: "/live-games" },
      ]
    },
    {
      id: "responsibleGaming",
      title: "Responsible Gaming",
      icon: FaHeart,
      path: "/responsible-gaming"
    },
    {
      id: "support",
      title: "Support",
      icon: FaHeadset,
      hasNotifications: true,
      subItems: [
        { title: "Help Center", icon: FaQuestionCircle, path: "/help" },
        { title: "Live Chat", icon: FaComments, path: "/live-chat" },
        { title: "FAQs", icon: FaQuestionCircle, path: "/faqs" },
      ]
    }
  ];

  const SidebarContent = () => (
    <>
      <div className="text-center pt-6">
        <NavLink to="/">
          <img src={logo} alt="Dinero Sweeps Logo" className="w-44 mx-auto mb-6" />
        </NavLink>
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
          <NavLink
            to="/get-coins"
            className={({ isActive }) =>
              `flex-1 font-bold rounded-xl bg-[#C0013A] py-2 hover:bg-[#A8002F] transition-colors text-center ${isActive ? 'ring-2 ring-yellow-400' : ''}`
            }
          >
            Get Coins
          </NavLink>
          <button className="flex-1 font-bold rounded-xl bg-[#C0013A] py-2 hover:bg-[#A8002F] transition-colors">
            Redeem
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {navigationItems.map((item) => (
          <div key={item.id} className="mx-4 mb-2">
            <button
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 border-yellow-400 text-white font-bold text-lg bg-gradient-to-r from-black via-[#1c0f18] to-black hover:bg-gradient-to-r hover:from-[#2a1a2a] hover:via-[#1c0f18] hover:to-[#2a1a2a] transition-all duration-200"
              onClick={() => {
                if (item.subItems) {
                  toggleSection(item.id);
                } else if (item.path) {
                  window.location.href = item.path;
                }
              }}
            >
              <span className="flex items-center gap-2">
                <item.icon />
                {item.title}
                {item.hasNotifications && (
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                )}
              </span>
              {item.subItems && (openSection === item.id ? <FaChevronUp /> : <FaChevronDown />)}
            </button>
            
            {item.subItems && openSection === item.id && (
              <ul className="mt-3 space-y-2 pl-4">
                {item.subItems.map((subItem, index) => (
                  <li key={index}>
                    <NavLink
                      to={subItem.path}
                      className={({ isActive }) =>
                        `flex items-center gap-2 cursor-pointer transition-colors py-2 px-3 rounded-lg hover:bg-[#2a1a2a] ${isActive ? 'bg-[#2a1a2a] text-yellow-400' : 'hover:text-yellow-400 text-white'}`
                      }
                    >
                      <subItem.icon className="text-sm" />
                      <span className="text-base">{subItem.title}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="mt-auto pt-6 pb-6 flex justify-center gap-4">
        {[FaInstagram, FaTiktok, FaFacebook, FaTwitter].map((Icon, idx) => (
          <a
            key={idx}
            href="#"
            className="bg-white rounded-xl p-2 flex items-center justify-center hover:bg-gray-200 transition-colors"
            style={{ width: 44, height: 44 }}
          >
            <Icon className="text-black text-xl" />
          </a>
        ))}
      </div>
    </>
  );

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#C0013A] text-white p-3 rounded-lg"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobileMenu}
        />
      )}
  
      <aside
        className={`fixed lg:relative flex flex-col text-white font-sans z-50 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{
          width: 260,
          minHeight: "100vh",
          background: "linear-gradient(180deg, #18111A 0%, #1B0F1A 100%)",
        }}
      >
        <SidebarContent />
      </aside>
    </>
  );
};

export default Sidebar;
