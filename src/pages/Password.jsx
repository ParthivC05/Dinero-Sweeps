import React, { useState } from "react";

const Password = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage("All fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }
    setLoading(true);
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/me/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ oldPassword, newPassword })
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Password updated successfully!');
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage(data.error || 'Failed to update password.');
      }
    } catch (err) {
      setMessage('Failed to update password.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-transparent pt-8 pb-16">
      <div className="w-full max-w-2xl bg-[#232224] rounded-2xl shadow-lg p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold text-white mb-1">Current Password <span className="text-red-400">*</span></label>
            <input className="input-field w-full bg-gray-900 text-white" type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-white mb-1">New Password <span className="text-red-400">*</span></label>
            <input className="input-field w-full bg-gray-900 text-white" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
          </div>
          <div className="mb-8">
            <label className="block font-semibold text-white mb-1">Confirm Password <span className="text-red-400">*</span></label>
            <input className="input-field w-full bg-gray-900 text-white" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
          </div>
          <button type="submit" className="bg-gradient-to-r from-orange-400 to-red-600 px-8 py-2 rounded-full text-white font-bold shadow-lg" disabled={loading}>{loading ? 'Updating...' : 'Submit'}</button>
          {message && <div className="mt-4 text-center text-yellow-400 font-semibold">{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default Password; 