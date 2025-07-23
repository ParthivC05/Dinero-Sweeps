import React from "react";
import { FaCoins, FaCrown } from "react-icons/fa";
import leprechaun from "../assets/bonus-drop.gif";

const coinPackages = [
  { label: "20% Extra", coins: 60000, price: 9.99, highlight: true },
  { label: "VIP OFFER", coins: 200000, price: 74.99, vip: true },
  { label: "23% Extra", coins: 160000, price: 64.99 },
  { label: "21% Extra", coins: 140000, price: 54.99 },
];

const packageList = [
  { coins: 4000, price: 1.99 },
  { coins: 50000, price: 4.99, bonus: "Free SC 5" },
  { coins: 4000, price: 4.99, bonus: "Free SC 25" },
  { coins: 4000, price: 4.99, bonus: "Free SC 5" },
  { coins: 4000, price: 4.99, bonus: "Free SC 5" },
  { coins: 4000, price: 4.99, bonus: "Free SC 5" },
  { coins: 4000, price: 4.99, bonus: "Free SC 5" },
  { coins: 4000, price: 4.99, bonus: "Free SC 5" },
];

const leaderboard = [
  { id: 1, name: "Ashish Raj", multiplier: 2055.65, result: 50000000, highlight: "green" },
  { id: 2, name: "Ashish Raj", multiplier: 2055.65, result: 54857867, highlight: "white" },
  { id: 3, name: "Ashish Raj", multiplier: 2055.65, result: 34657987, highlight: "red" },
];

const plays = Array.from({ length: 12 }, (_, i) => ({
  game: "Wild Rich",
  playId: "1040153604",
  user: "Hidden",
  time: "11:35:54 PM",
  amount: 70.28,
  multiplier: 80.34,
  result: 62.987,
}));

export default function GetCoins() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="flex-1 flex flex-col items-center">
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Buy Gold Coin Packages!</h2>
        <div className="flex gap-4 mb-8 flex-wrap justify-center">
          {coinPackages.map((pkg, idx) => (
            <div
              key={idx}
              className={`rounded-2xl px-6 py-4 flex flex-col items-center shadow-lg border-2 mx-2 my-2 ${
                pkg.vip
                  ? "border-yellow-400 bg-black text-yellow-400"
                  : pkg.highlight
                  ? "border-pink-500 bg-black text-pink-400"
                  : "border-gray-700 bg-[#181818] text-white"
              }`}
              style={pkg.vip ? { boxShadow: "0 0 20px 4px #FFD600" } : {}}
            >
              <div className="flex items-center gap-2 mb-2">
                {pkg.vip && <FaCrown className="text-blue-400 text-2xl" />}
                <span className="font-bold">{pkg.label}</span>
              </div>
              <div className="text-3xl font-bold mb-2">{pkg.coins.toLocaleString()} Gold coins</div>
              <div className="text-lg font-bold">${pkg.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div className="w-full max-w-2xl">
          {packageList.map((pkg, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-[#181818] rounded-xl mb-3 px-6 py-4 border border-gray-700"
            >
              <div className="flex items-center gap-3">
                <FaCoins className="text-yellow-400 text-2xl" />
                <span className="text-white text-lg font-bold">GC {pkg.coins.toLocaleString()}</span>
                {pkg.bonus && (
                  <span className="ml-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                    + {pkg.bonus}
                  </span>
                )}
              </div>
              <div className="bg-pink-500 text-white font-bold px-6 py-2 rounded-full text-lg shadow">
                ${pkg.price.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full max-w-2xl text-center mt-6 mb-2 text-gray-300 text-xs">
          At Orion Star it is ALWAYS FREE to enter or win our Sweepstakes games. No Purchase Necessary. Void where prohibited by law. Find out more in our Sweepstakes Rules. Terms of Service apply.
        </div>
        <img src={leprechaun} alt="Leprechaun" className="mx-auto mb-4" style={{ width: 80 }} />
        {/* Leaderboard */}
        <div className="w-full max-w-4xl bg-[#181818] rounded-2xl shadow-lg p-6 mt-4 mb-8 border border-pink-500">
          <div className="flex gap-4 mb-6 justify-center">
            {leaderboard.map((entry, idx) => (
              <div
                key={entry.id}
                className={`flex flex-col items-center px-6 py-4 rounded-2xl border-2 ${
                  entry.highlight === "green"
                    ? "border-green-400 text-green-400"
                    : entry.highlight === "red"
                    ? "border-red-400 text-red-400"
                    : "border-gray-400 text-white"
                }`}
                style={entry.highlight === "white" ? { boxShadow: "0 0 16px 2px #fff" } : {}}
              >
                <img src={leprechaun} alt="Leprechaun" className="w-12 mb-2" />
                <div className="text-xs font-bold mb-1">ID: 19371329906</div>
                <div className="text-lg font-bold mb-1">{entry.name}</div>
                <div className="text-xs">Multiplier<br /><span className="font-bold">{entry.multiplier}x</span></div>
                <div className="text-xs">Result<br /><span className="font-bold">{entry.result.toLocaleString()}</span></div>
                <div className="mt-2 text-base font-bold">
                  {idx === 0 ? "No. 1" : idx === 1 ? "No. 2" : "No. 3"}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mb-4">
            <button className="text-white font-bold px-4 py-2 rounded-full bg-[#232324] border border-gray-700 mr-2">My plays</button>
            <button className="text-gray-400 font-bold px-4 py-2 rounded-full bg-[#232324] border border-gray-700 mr-2">All</button>
            <button className="text-gray-400 font-bold px-4 py-2 rounded-full bg-[#232324] border border-gray-700 mr-2">High Rollers</button>
            <button className="text-gray-400 font-bold px-4 py-2 rounded-full bg-[#232324] border border-gray-700">Rare Win</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-white text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-2 py-1">Game</th>
                  <th className="px-2 py-1">Play ID</th>
                  <th className="px-2 py-1">User</th>
                  <th className="px-2 py-1">Time</th>
                  <th className="px-2 py-1">Amount</th>
                  <th className="px-2 py-1">Multiplier</th>
                  <th className="px-2 py-1">Result</th>
                </tr>
              </thead>
              <tbody>
                {plays.map((play, idx) => (
                  <tr key={idx} className="border-b border-gray-800">
                    <td className="px-2 py-1">{play.game}</td>
                    <td className="px-2 py-1">{play.playId}</td>
                    <td className="px-2 py-1">{play.user}</td>
                    <td className="px-2 py-1">{play.time}</td>
                    <td className="px-2 py-1 text-green-400">{play.amount.toFixed(3)}</td>
                    <td className="px-2 py-1">{play.multiplier}x</td>
                    <td className="px-2 py-1 text-green-400">${play.result.toFixed(3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 