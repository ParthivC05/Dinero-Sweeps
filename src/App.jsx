import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import OAuthCallback from "./pages/OAuthCallback";
import MainLayout from "./components/MainLayout";
import GameList from "./components/GameList";
import Profile from "./pages/Profile";
import GetCoins from "./pages/GetCoins";
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
         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
