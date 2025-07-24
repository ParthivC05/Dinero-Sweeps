import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import OAuthCallback from "./pages/OAuthCallback";
import MainLayout from "./components/MainLayout";
import GameList from "./components/GameList";
import Profile from "./pages/Profile";
import GetCoins from "./pages/GetCoins";
import FAQ from "./pages/FAQ";
import BonusTerms from "./pages/BonusTerms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import GeneralTerms from "./pages/GeneralTerms";
import ResponsibleGaming from "./pages/ResponsibleGaming";
import Transactions from "./pages/Transactions";
import Faucet from "./pages/Faucet";
import TaskList from "./pages/TaskList";
import Tickets from "./pages/Tickets";
import './App.css';

function ProtectedRoute() {
  const isLoggedIn = !!localStorage.getItem('authToken');
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/oauth-callback" element={<OAuthCallback />} />
        <Route path="/*" element={<MainLayout />}>
          <Route path="" element={<GameList />} />
          <Route element={<ProtectedRoute />}>
            <Route path="profile/*" element={<Profile />} />
            <Route path="get-coins" element={<GetCoins />} />
          </Route>
          {/* Footer pages as children so they get sidebar/footer */}
          <Route path="faq" element={<FAQ />} />
          <Route path="bonus-terms" element={<BonusTerms />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="general-terms" element={<GeneralTerms />} />
          <Route path="responsible-gaming" element={<ResponsibleGaming />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="faucet" element={<Faucet />} />
          <Route path="task-list" element={<TaskList />} />
          <Route path="tickets" element={<Tickets />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
