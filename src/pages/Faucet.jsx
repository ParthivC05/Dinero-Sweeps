import React from "react";

const Faucet = () => (
  <div className="max-w-2xl mx-auto p-8 text-white">
    <h1 className="text-3xl font-bold mb-4">Faucet</h1>
    <p className="mb-2">Claim your free coins every day! No purchase necessary.</p>
    <button className="bg-yellow-400 text-black font-bold px-6 py-2 rounded-full shadow hover:bg-yellow-500 transition-colors mt-4">Claim Now</button>
    <p className="mt-4 text-sm text-gray-300">Limit: 1 claim per 24 hours. Abuse will result in account suspension.</p>
  </div>
);

export default Faucet; 