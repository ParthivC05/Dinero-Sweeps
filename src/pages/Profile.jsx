import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8004/api/v1";

function MyInfoModal({ user, open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-gradient-to-br from-[#0a2a3a] to-[#0d1e2b] rounded-2xl p-8 shadow-xl relative min-w-[400px] max-w-[90vw]">
        <button onClick={onClose} className="absolute top-4 right-4 text-3xl text-red-400 hover:text-red-600">&times;</button>
        <div className="flex items-center gap-6 mb-6">
          <img src={user.avatar || "/default-avatar.png"} alt="avatar" className="w-28 h-28 rounded-full border-4 border-yellow-400 object-cover" />
          <div>
            <div className="text-2xl font-bold text-white">{user.firstName} {user.lastName}</div>
            <div className="text-lg text-gray-300">ID: {user._id}</div>
            <div className="text-sm text-white mt-2">Referred friend: 0</div>
            <div className="text-green-400 font-bold">SC 0 Earned</div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="rounded-xl border-2 border-pink-400 p-4 text-center">
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
}

function SettingsForm({ user }) {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-lg shadow text-white mt-8">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="flex gap-2 mb-6">
        <button className="bg-yellow-400 text-black px-4 py-2 rounded font-bold">Verify Profile</button>
        <button className="bg-gray-700 px-4 py-2 rounded">Email</button>
        <button className="bg-gray-700 px-4 py-2 rounded">Password</button>
        <button className="bg-gray-700 px-4 py-2 rounded">Avatar</button>
        <button className="bg-gray-700 px-4 py-2 rounded">Bonus Drop</button>
        <button className="bg-gray-700 px-4 py-2 rounded">Document Verification</button>
        <button className="bg-gray-700 px-4 py-2 rounded">Self Exclusion</button>
      </div>
      <form>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">First Name</label>
            <input className="input-field w-full" value={user.firstName || ''} readOnly />
          </div>
          <div>
            <label className="block font-semibold">Last Name</label>
            <input className="input-field w-full" value={user.lastName || ''} readOnly />
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Email Address</label>
          <input className="input-field w-full" value={user.email || ''} readOnly />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Phone number</label>
          <input className="input-field w-full" value={user.phone || ''} readOnly />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Address</label>
          <input className="input-field w-full" value={user.address || ''} placeholder="Street name and House no." onChange={() => {}} />
          <div className="text-red-400 text-xs">Required Field</div>
        </div>
        <div className="mb-4">
          <input className="input-field w-full" placeholder="Address line 2 (Optional)" />
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">State</label>
            <select className="input-field w-full">
              <option>United States</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold">City</label>
            <select className="input-field w-full">
              <option>Texas</option>
            </select>
          </div>
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Zipcode</label>
            <input className="input-field w-full" />
          </div>
          <div>
            <label className="block font-semibold">Date of Birth</label>
            <input className="input-field w-full" type="date" />
          </div>
        </div>
        <div className="text-gray-400 mb-4">All data is safely stored and encrypted.</div>
        <button type="submit" className="bg-gradient-to-r from-orange-400 to-red-600 px-8 py-2 rounded-full text-white font-bold shadow-lg">Save</button>
      </form>
    </div>
  );
}

const Profile = () => {
  const [user, setUser] = useState(null);
  const [showMyInfo, setShowMyInfo] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    axios
      .get(`${API_BASE_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data));
  }, []);

  useEffect(() => {
    if (location.pathname === '/profile/my-info') setShowMyInfo(true);
    else setShowMyInfo(false);
  }, [location.pathname]);

  if (!user) return <div className="text-white p-8">Loading...</div>;

  return (
    <>
      <Routes>
        <Route path="my-info" element={<MyInfoModal user={user} open={showMyInfo} onClose={() => navigate('/profile')} />} />
        <Route path="settings" element={<SettingsForm user={user} />} />
      </Routes>
      {location.pathname === '/profile' && <SettingsForm user={user} />}
    </>
  );
};

export default Profile;
