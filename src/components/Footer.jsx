import React from "react";
import logo from "../assets/logo.png";
import { FaInstagram, FaTiktok, FaFacebook, FaTimes } from "react-icons/fa";

const Footer = () => (
  <footer className="w-full bg-gradient-to-b from-black to-[#3a0d2e] text-white pt-8 pb-4 px-4 flex flex-col items-center">
    <div className="w-full max-w-5xl flex flex-col items-center">
      <img src={logo} alt="Orion Stars Logo" className="w-32 mb-2" />
      <div className="text-sm text-gray-200 mb-2">@2025 Orion Star | All rights reserved.</div>
      <div className="text-center text-gray-300 text-sm mb-6 max-w-2xl">
        At Orion Star it is ALWAYS FREE to enter or win our Sweepstakes games. No Purchase Necessary. Void where prohibited by law. Find out more in our Sweepstakes Rules. Terms of Service apply.
      </div>
      <div className="w-full flex flex-col md:flex-row justify-center md:justify-between gap-8 mb-6">
        <div className="flex-1 min-w-[180px]">
          <div className="font-bold mb-2">My Account</div>
          <ul className="space-y-1">
            <li><a href="#" className="underline hover:text-yellow-400">My Info</a></li>
            <li><a href="#" className="underline hover:text-yellow-400">Settings</a></li>
            <li><a href="#" className="underline hover:text-yellow-400">Faucet</a></li>
            <li><a href="#" className="underline hover:text-yellow-400">Transactions</a></li>
          </ul>
        </div>
        <div className="flex-1 min-w-[180px]">
          <div className="font-bold mb-2">Features</div>
          <ul className="space-y-1">
            <li><a href="#" className="underline hover:text-yellow-400">Task List</a></li>
            <li><a href="#" className="underline hover:text-yellow-400">Tickets</a></li>
          </ul>
        </div>
        <div className="flex-1 min-w-[180px]">
          <div className="font-bold mb-2">Support</div>
          <ul className="space-y-1">
            <li><a href="#" className="underline hover:text-yellow-400">FAQ</a></li>
            <li><a href="#" className="underline hover:text-yellow-400">Bonus Terms</a></li>
            <li><a href="#" className="underline hover:text-yellow-400">Privacy policy</a></li>
            <li><a href="#" className="underline hover:text-yellow-400">General terms & conditions</a></li>
            <li><a href="#" className="underline hover:text-yellow-400">Responsible gaming</a></li>
          </ul>
        </div>
      </div>
      <div className="w-full flex flex-col items-center mb-6">
        <div className="font-bold mb-2">Follow us</div>
        <div className="flex gap-4 mb-2">
          <a href="#" className="bg-white rounded-xl p-2 flex items-center justify-center hover:bg-gray-200 transition-colors" style={{ width: 44, height: 44 }}><FaInstagram className="text-black text-xl" /></a>
          <a href="#" className="bg-white rounded-xl p-2 flex items-center justify-center hover:bg-gray-200 transition-colors" style={{ width: 44, height: 44 }}><FaTiktok className="text-black text-xl" /></a>
          <a href="#" className="bg-white rounded-xl p-2 flex items-center justify-center hover:bg-gray-200 transition-colors" style={{ width: 44, height: 44 }}><FaFacebook className="text-black text-xl" /></a>
          <a href="#" className="bg-white rounded-xl p-2 flex items-center justify-center hover:bg-gray-200 transition-colors" style={{ width: 44, height: 44 }}><FaTimes className="text-black text-xl" /></a>
        </div>
        <hr className="w-full border-gray-500 my-2" />
      </div>
      <div className="w-full text-center text-sm text-gray-300 mb-1">
        Online support 24/7 : <a href="mailto:Support@orionstarsweeps.com" className="font-bold underline hover:text-yellow-400">Support@orionstarsweeps.com</a> | Business : <a href="mailto:Support@orionstarsweeps.com" className="font-bold underline hover:text-yellow-400">Support@orionstarsweeps.com</a>
      </div>
      <div className="w-full text-center text-sm text-gray-300 mb-1">
        US Payment Related Queries (24/7): <a href="tel:+123275698765" className="underline hover:text-yellow-400">+1 (232) 756-98765</a>
      </div>
    </div>
  </footer>
);

export default Footer; 