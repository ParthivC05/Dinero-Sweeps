import React, { useState } from "react";
import { FaLock } from "react-icons/fa";

const VerifyProfile = ({ user }) => {
  const [form, setForm] = useState({
    address: user.address || '',
    address2: user.address2 || '',
    state: user.state || '',
    city: user.city || '',
    zipcode: user.zipcode || '',
    dateOfBirth: user.dateOfBirth || '',
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Profile updated successfully!');
      } else {
        setMessage(data.error || 'Failed to update profile.');
      }
    } catch (err) {
      setMessage('Failed to update profile.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-transparent pt-8 pb-16">
      <div className="w-full max-w-2xl bg-[#232224] rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Personal information</h2>
        <form onSubmit={handleSubmit}>
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
            <label className="block font-semibold text-white mb-1">Address</label>
            <input className="input-field w-full bg-gray-900 text-white border border-red-500" name="address" value={form.address} onChange={handleChange} placeholder="Street name and House no." required />
            <div className="text-red-400 text-xs mt-1">Required Field</div>
          </div>
          <div className="mb-4">
            <input className="input-field w-full bg-gray-900 text-white" name="address2" value={form.address2} onChange={handleChange} placeholder="Address line 2 (Optional)" />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-white mb-1">State</label>
              <input className="input-field w-full bg-gray-900 text-white" name="state" value={form.state} onChange={handleChange} placeholder="State" />
            </div>
            <div>
              <label className="block font-semibold text-white mb-1">City</label>
              <input className="input-field w-full bg-gray-900 text-white" name="city" value={form.city} onChange={handleChange} placeholder="City" />
            </div>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-white mb-1">Zipcode</label>
              <input className="input-field w-full bg-gray-900 text-white" name="zipcode" value={form.zipcode} onChange={handleChange} placeholder="Zipcode" />
            </div>
            <div>
              <label className="block font-semibold text-white mb-1">Date of Birth</label>
              <input className="input-field w-full bg-gray-900 text-white" type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} />
            </div>
          </div>
          <div className="text-gray-400 mb-4">All data is safely stored and encrypted.</div>
          <button type="submit" className="bg-gradient-to-r from-orange-400 to-red-600 px-8 py-2 rounded-full text-white font-bold shadow-lg" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
          {message && <div className="mt-4 text-center text-yellow-400 font-semibold">{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default VerifyProfile; 