import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const error = params.get('error');
    if (token) {
      localStorage.setItem('authToken', token);
      navigate('/dashboard');
    } else if (error) {
      alert('OAuth failed: ' + error);
      navigate('/login');
    }
  }, [navigate]);

  return <div>Signing you in...</div>;
};

export default OAuthCallback; 