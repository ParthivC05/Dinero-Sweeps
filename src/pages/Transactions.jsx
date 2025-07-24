import React from "react";

const Transactions = () => (
  <div className="max-w-2xl mx-auto p-8 text-white">
    <h1 className="text-3xl font-bold mb-4">Transactions</h1>
    <p className="mb-2">View your recent transactions, including coin purchases, redemptions, and bonuses.</p>
    <ul className="list-disc pl-6 mb-4">
      <li>Gold Coin Purchase - 1000 GC - 2025-05-01</li>
      <li>Bonus Drop - 500 GC - 2025-04-28</li>
      <li>Faucet Claim - 100 GC - 2025-04-27</li>
    </ul>
    <p>For a full statement, contact <a href="mailto:Support@orionstarsweeps.com" className="underline text-yellow-400">Support@orionstarsweeps.com</a>.</p>
  </div>
);

export default Transactions; 