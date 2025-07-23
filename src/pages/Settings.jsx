import React from "react";
import { NavLink, Outlet, Routes, Route, useNavigate } from "react-router-dom";
import VerifyProfile from "./VerifyProfile";
import Email from "./Email";
import Password from "./Password";
import AvatarTab from "./AvatarTab";
import BonusDrop from "./BonusDrop";
import { FaArrowLeft } from "react-icons/fa";

const tabs = [
  { label: "Verify Profile", path: "verify-profile" },
  { label: "Email", path: "email" },
  { label: "Password", path: "password" },
  { label: "Avatar", path: "avatar" },
  { label: "Bonus Drop", path: "bonus-drop" },
  { label: "Document Verification", path: "document-verification" },
  { label: "Self Exclusion", path: "self-exclusion" },
];

const Settings = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-transparent pt-8 pb-16">
      <div className="w-full max-w-4xl mx-auto flex items-center mb-4">
        <button
          className="flex items-center gap-2 text-white text-2xl font-bold hover:text-yellow-400 transition-colors"
          onClick={() => navigate(-1)}
          style={{ background: "none", border: "none", outline: "none", boxShadow: "none" }}
        >
          <FaArrowLeft />
          Profile
        </button>
      </div>
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex w-full rounded-2xl overflow-hidden bg-[#282324] shadow-lg">
          {tabs.map(tab => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `flex-1 text-center px-6 py-1 font-semibold text-lg transition-colors
                ${isActive ? 'bg-yellow-400 text-black rounded-xl mx-2 shadow' : 'bg-transparent text-white hover:text-yellow-400'}`
              }
              style={{ borderRadius: '18px', margin: '8px 8px 8px 0' }}
              end
            >
              {tab.label}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="h-4" />
      <div className="w-full">
        <Routes>
          <Route path="verify-profile" element={<VerifyProfile user={user} />} />
          <Route path="email" element={<Email user={user} />} />
          <Route path="password" element={<Password />} />
          <Route path="avatar" element={<AvatarTab user={user} />} />
          <Route path="bonus-drop" element={<BonusDrop user={user} />} />
          <Route path="document-verification" element={<VerifyProfile user={user} />} />
          <Route path="self-exclusion" element={<BonusDrop user={user} />} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};

export default Settings; 