import React from "react";
import Avatar from "react-avatar";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MyInfo = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-transparent pt-8 pb-16">
      <div className="w-full max-w-2xl bg-gradient-to-br from-[#0a2a3a] to-[#0d1e2b] rounded-2xl p-6 shadow-xl relative mb-8">
        <button
          className="absolute top-4 right-4 text-2xl text-red-400 hover:text-red-600"
          onClick={() => navigate("/")}
        >
          <FaTimes />
        </button>
        <div className="flex items-center gap-6 mb-6">
          <div className="relative">
            <div className="rounded-full border-4 border-yellow-400" style={{ width: 80, height: 80, overflow: 'hidden' }}>
              <Avatar
                src={user.avatar}
                name={user.firstName + ' ' + user.lastName}
                size="80"
                round={true}
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="text-2xl font-bold text-white">{user.firstName} {user.lastName}</div>
            <div className="text-lg text-gray-300">ID: {user._id || user.id}</div>
            <div className="text-sm text-white mt-2">Referred friend: 0</div>
            <div className="text-green-400 font-bold">SC 0 Earned</div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="rounded-xl border-2 border-yellow-400 p-4 text-center">
            <div className="text-3xl font-bold text-white">{user.stats?.losses || 0}</div>
            <div className="text-lg text-white mt-2">Losses</div>
          </div>
          <div className="rounded-xl border-2 border-yellow-400 p-4 text-center">
            <div className="text-3xl font-bold text-white">{user.stats?.wins || 0}</div>
            <div className="text-lg text-white mt-2">Wins</div>
          </div>
          <div className="rounded-xl border-2 border-yellow-400 p-4 text-center">
            <div className="text-3xl font-bold text-white">{user.stats?.totalBets || 0}</div>
            <div className="text-lg text-white mt-2">Bet</div>
          </div>
          <div className="rounded-xl border-2 border-yellow-400 p-4 text-center">
            <div className="text-3xl font-bold text-white">$20K</div>
            <div className="text-lg text-white mt-2">Wagered</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInfo; 