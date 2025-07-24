import React from "react";

const Tickets = () => (
  <div className="max-w-2xl mx-auto p-8 text-white">
    <h1 className="text-3xl font-bold mb-4">Tickets</h1>
    <p className="mb-2">Submit a support ticket or view your existing tickets below.</p>
    <ul className="list-disc pl-6 mb-4">
      <li>Ticket #12345 - Pending - "Unable to claim bonus"</li>
      <li>Ticket #12344 - Resolved - "Login issue"</li>
    </ul>
    <button className="bg-yellow-400 text-black font-bold px-6 py-2 rounded-full shadow hover:bg-yellow-500 transition-colors mt-4">Submit New Ticket</button>
  </div>
);

export default Tickets; 