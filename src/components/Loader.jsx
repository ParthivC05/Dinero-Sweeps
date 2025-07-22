import React from 'react';
import loaderImg from '../assets/loader.gif';

const Loader = ({ size = 200 }) => (
  <div className="flex flex-col items-center justify-center w-full h-full py-8">
    <img    
      src={loaderImg}
      alt="Loading..."
      style={{ width: size, height: size }}
      className="animate-spin-slow"
    />
  
  </div>
);

export default Loader;