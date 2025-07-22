import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import MyInfo from "./MyInfo";
import Settings from "./Settings";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8004/api/v1";

const Profile = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    axios
      .get(`${API_BASE_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data));
  }, []);

  if (!user) return <div className="text-white p-8"><Loader /></div>;

  return (
    <Routes>
      <Route path="/" element={<Navigate to="my-info" />} />
      <Route path="my-info" element={<MyInfo user={user} />} />
      <Route path="settings/*" element={<Settings user={user} />} />
    </Routes>
  );
};

export default Profile;
