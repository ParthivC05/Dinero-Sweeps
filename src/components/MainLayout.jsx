import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Chat from "./Chat";
import { FaComments } from "react-icons/fa";
import { Outlet } from "react-router-dom";

const CHAT_WIDTH = 384;

const MainLayout = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="flex min-h-screen bg-black relative">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex flex-row">
          <div className="flex-1 flex flex-col">
            <Outlet />
          </div>
          {showChat && (
            <div
              className="h-full bg-gradient-to-b from-black to-pink-900 border-l border-gray-800 w-full max-w-md shadow-2xl flex flex-col relative"
              style={{ minWidth: 320, width: CHAT_WIDTH }}
            >
              <button
                onClick={() => setShowChat(false)}
                className="absolute top-3 right-3 text-white text-3xl font-bold z-20 hover:text-pink-400 focus:outline-none"
                aria-label="Close chat"
              >
                &times;
              </button>
              <Chat />
            </div>
          )}
        </div>
        <Footer />
      </div>
      {!showChat && (
        <button
          className="fixed bottom-6 right-6 z-50 bg-pink-600 hover:bg-pink-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center text-3xl focus:outline-none"
          onClick={() => setShowChat(true)}
          aria-label="Open chat"
        >
          <FaComments />
        </button>
      )}
    </div>
  );
};

export default MainLayout; 