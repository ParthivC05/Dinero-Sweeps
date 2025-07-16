import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import GameList from "../components/GameList";

const LandingPage = () => (
  <div style={{ display: "flex", minHeight: "100vh" }}>
    <Sidebar />
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* <Navbar /> */}
      <GameList />
    </div>
  </div>
);

export default LandingPage; 