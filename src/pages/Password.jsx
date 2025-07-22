import React from "react";

const Password = () => (
  <div className="flex flex-col items-center w-full min-h-screen bg-transparent pt-8 pb-16">
    <div className="w-full max-w-2xl bg-[#232224] rounded-2xl shadow-lg p-8">
      <form>
        <div className="mb-4">
          <label className="block font-semibold text-white mb-1">Current Password <span className="text-red-400">*</span></label>
          <input className="input-field w-full bg-gray-900 text-white" type="password" />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-white mb-1">New Password <span className="text-red-400">*</span></label>
          <input className="input-field w-full bg-gray-900 text-white" type="password" />
        </div>
        <div className="mb-8">
          <label className="block font-semibold text-white mb-1">Confirm Password <span className="text-red-400">*</span></label>
          <input className="input-field w-full bg-gray-900 text-white" type="password" />
        </div>
        <button type="submit" className="bg-gradient-to-r from-orange-400 to-red-600 px-8 py-2 rounded-full text-white font-bold shadow-lg">Submit</button>
      </form>
    </div>
  </div>
);

export default Password; 