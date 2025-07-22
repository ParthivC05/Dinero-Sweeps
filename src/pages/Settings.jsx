import React from "react";
import { NavLink, Outlet, Routes, Route } from "react-router-dom";
import VerifyProfile from "./VerifyProfile";
import Email from "./Email";
import Password from "./Password";

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
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-transparent pt-8 pb-16">
      <div className="w-full max-w-3xl mb-6">
        <div className="flex gap-2 bg-transparent">
          {tabs.map(tab => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-t-lg font-bold transition-colors ${isActive ? 'bg-yellow-400 text-black' : 'bg-gray-800 text-white'}`
              }
              end
            >
              {tab.label}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="w-full max-w-3xl">
        <Routes>
          <Route path="verify-profile" element={<VerifyProfile user={user} />} />
          <Route path="email" element={<Email user={user} />} />
          <Route path="password" element={<Password />} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};

export default Settings; 