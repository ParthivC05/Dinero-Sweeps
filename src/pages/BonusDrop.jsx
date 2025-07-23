import React, { useState } from "react";
import bonusDrop from "../assets/bonus-drop.gif";

const BonusDrop = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [bonus, setBonus] = useState(null);
  const [error, setError] = useState("");

  const isValidCode = /^[a-zA-Z0-9]{10}$/.test(code);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    setBonus(null);
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/bonus/redeem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ code })
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || 'Bonus successfully applied!');
        setBonus({ type: data.rewardType, amount: data.rewardAmount });
        setCode("");
      } else {
        setError(data.error || 'Invalid or expired code.');
        setCode("");
      }
    } catch (err) {
      setError('Failed to redeem code.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[300px]">
      <img
        src={bonusDrop}
        alt="Bonus Drop Leprechaun"
        className="w-64 mx-auto mb-4"
        style={{ maxWidth: '260px' }}
      />
      <form
        onSubmit={handleSubmit}
        className="bg-[#232323] rounded-2xl shadow-lg px-8 py-6 w-full max-w-xl flex flex-col items-center"
      >
        <label htmlFor="bonus-code" className="text-white text-lg font-semibold mb-2 w-full text-left">
          Code
        </label>
        <input
          id="bonus-code"
          type="text"
          value={code}
          onChange={e => setCode(e.target.value)}
          className="w-full bg-gray-700 text-white rounded-md px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-lg font-mono"
          placeholder="Enter bonus code here"
          maxLength={10}
        />
        <button
          type="submit"
          className="bg-gradient-to-b from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-bold py-2 px-10 rounded-full text-lg shadow-md transition-colors"
          disabled={!isValidCode || loading}
        >
          {loading ? 'Processing...' : 'Submit'}
        </button>
        {message && <div className="mt-4 text-green-400 font-semibold text-center">{message} {bonus && (<span>You received {bonus.amount} {bonus.type}</span>)}</div>}
        {error && <div className="mt-4 text-red-400 font-semibold text-center">{error}</div>}
        <div className="mt-4 text-gray-400 text-sm text-center">
          Find bonus codes on our <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Twitter</a> and <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Telegram</a>!
        </div>
      </form>
    </div>
  );
};

export default BonusDrop; 