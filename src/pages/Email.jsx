import React from "react";
import emailImg from "../assets/email.gif";

const Email = ({ user }) => (
  <div className="flex flex-col items-center w-full min-h-screen bg-transparent pt-8 pb-16">
    <div className="w-full max-w-2xl bg-[#232224] rounded-2xl shadow-lg p-8">
      <div className="flex flex-col items-center mb-6">
        <img src={emailImg} alt="info" className="w-32 h-32 mb-2" />
       
      </div>
      <div className="mb-4">
        <label className="block font-semibold text-white mb-1">Current Email</label>
        <input className="input-field w-full bg-gray-900 text-white" value={user.email || ''} readOnly />
      </div>
    </div>
  </div>
);

export default Email; 