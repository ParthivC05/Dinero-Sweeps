import React from "react";
import { FaLock } from "react-icons/fa";

const VerifyProfile = ({ user }) => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-transparent pt-8 pb-16">
      <div className="w-full max-w-2xl bg-[#232224] rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Personal information</h2>
        <form>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-white mb-1">First Name</label>
              <div className="relative">
                <input className="input-field w-full pr-8 bg-gray-900 text-white" value={user.firstName || ''} readOnly />
                <FaLock className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block font-semibold text-white mb-1">Last Name</label>
              <div className="relative">
                <input className="input-field w-full pr-8 bg-gray-900 text-white" value={user.lastName || ''} readOnly />
                <FaLock className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-white mb-1">Email Address</label>
            <div className="relative">
              <input className="input-field w-full pr-8 bg-gray-900 text-white" value={user.email || ''} readOnly />
              <FaLock className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-white mb-1">Phone number</label>
            <div className="relative">
              <input className="input-field w-full pr-8 bg-gray-900 text-white" value={user.phone || ''} readOnly />
              <FaLock className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-white mb-1">Address</label>
            <input className="input-field w-full bg-gray-900 text-white border border-red-500" value={user.address || ''} placeholder="Street name and House no." />
            <div className="text-red-400 text-xs mt-1">Required Field</div>
          </div>
          <div className="mb-4">
            <input className="input-field w-full bg-gray-900 text-white" placeholder="Address line 2 (Optional)" />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-white mb-1">State</label>
              <select className="input-field w-full bg-gray-900 text-white">
                <option>United States</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-white mb-1">City</label>
              <select className="input-field w-full bg-gray-900 text-white">
                <option>Texas</option>
              </select>
            </div>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-white mb-1">Zipcode</label>
              <input className="input-field w-full bg-gray-900 text-white" />
            </div>
            <div>
              <label className="block font-semibold text-white mb-1">Date of Birth</label>
              <input className="input-field w-full bg-gray-900 text-white" type="date" />
            </div>
          </div>
          <div className="text-gray-400 mb-4">All data is safely stored and encrypted.</div>
          <button type="submit" className="bg-gradient-to-r from-orange-400 to-red-600 px-8 py-2 rounded-full text-white font-bold shadow-lg">Save</button>
        </form>
      </div>
    </div>
  );
};

export default VerifyProfile; 