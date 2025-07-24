import React from "react";

const ResponsibleGaming = () => (
  <div className="max-w-2xl mx-auto p-8 text-white">
    <h1 className="text-3xl font-bold mb-4">Responsible Gaming</h1>
    <p className="mb-2">We are committed to promoting responsible gaming and providing a safe environment for all players.</p>
    <ul className="list-disc pl-6 mb-4">
      <li>Set limits on your play time and spending.</li>
      <li>Take breaks and play for fun, not profit.</li>
      <li>If you need help, contact our support team or seek professional assistance.</li>
      <li>Self-exclusion options are available in your profile settings.</li>
    </ul>
    <p>For more information, visit our <a href="/profile/settings/self-exclusion" className="underline text-yellow-400">Self Exclusion</a> page.</p>
  </div>
);

export default ResponsibleGaming; 