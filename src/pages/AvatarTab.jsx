import React, { useRef, useState } from "react";
import Avatar from "react-avatar";

const AvatarTab = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef();

  const avatarUrl = user.avatar
    ? `${import.meta.env.VITE_API_BASE_URL.replace('/api/v1', '')}/${user.avatar.replace(/\\/g, '/')}`
    : undefined;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }
    const token = localStorage.getItem('authToken');
    const formData = new FormData();
    formData.append('avatar', selectedFile);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/me/avatar`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });
      if (response.ok) {
        alert('Avatar updated successfully!');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to update avatar.');
      }
    } catch (err) {
      alert('Failed to update avatar.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[300px]">
      <div className="bg-[#181818] rounded-2xl shadow-lg px-8 py-6 w-full max-w-2xl flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-6">
          <div>
            {preview ? (
              <img
                src={preview}
                alt="Avatar Preview"
                className="rounded-full w-20 h-20 object-cover border-4 border-yellow-400 shadow-lg"
              />
            ) : avatarUrl ? (
              <img
                src={avatarUrl}
                alt="User Avatar"
                className="rounded-full w-20 h-20 object-cover border-4 border-yellow-400 shadow-lg"
                crossOrigin="anonymous"
              />
            ) : (
              <Avatar
                name={user?.name || user?.username || "User"}
                size="80"
                round
                color="#FFD600"
                className="shadow-lg"
              />
            )}
          </div>
          <div className="flex flex-col">
            <div className="text-white text-xl font-bold">
              {user?.name || user?.username || "User"}
            </div>
            <div className="text-gray-300 text-sm font-semibold">
              ID: {user?.id || user?._id || "N/A"}
            </div>
            <div className="text-gray-300 text-xs mt-1">
              JPG or PNG<br />Max File Size 2 MB
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <input
            type="file"
            accept="image/png, image/jpeg"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-8 rounded-full text-lg transition-colors"
            onClick={handleChooseFile}
          >
            Choose File
          </button>
          <button
            className="bg-gradient-to-b from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-bold py-2 px-8 rounded-full text-lg shadow-md transition-colors"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarTab; 