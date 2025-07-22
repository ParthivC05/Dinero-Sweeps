import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:8004');

const LOCAL_STORAGE_KEY = 'chat_messages';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setMessages(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    const handleHistory = (msgs) => {
      setMessages((prev) => {
        const all = [...prev, ...msgs];
        const unique = Array.from(new Set(all.map(m => JSON.stringify(m)))).map(s => JSON.parse(s));
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(unique));
        return unique;
      });
    };
    const handleReceive = (msg) => {
      setMessages((prev) => {
        const all = [...prev, msg];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(all));
        return all;
      });
    };
    socket.on('chat_history', handleHistory);
    socket.on('receive_message', handleReceive);
    return () => {
      socket.off('chat_history', handleHistory);
      socket.off('receive_message', handleReceive);
    };
  }, []);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });
    return () => {
      socket.off('connect');
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      socket.emit('send_message', {
        text: input,
        userId: user?.id,
        username: user?.username
      });
      setInput('');
    }
  };

  return (
    <div className="flex flex-col p-3 h-100vh bg-gradient-to-b from-black to-pink-900 font-sans w-full mx-auto rounded-lg shadow-lg border border-gray-800">
      <div className="overflow-y-auto hide-scrollbar space-y-3 pb-2">
        {messages.map((msg, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="text-xs font-bold text-white mb-1 ml-1">{msg.username || 'Anonymous'}</span>
            <div
              className={
                msg.offensive
                  ? 'border-2 border-yellow-400 bg-yellow-900/20 text-yellow-300 font-bold rounded-lg px-4 py-3 text-sm text-center'
                  : 'bg-[#18111A] text-white rounded-lg px-4 py-3 text-sm font-normal'
              }
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="flex items-center border-t border-pink-900 mt-4 pt-3 gap-2">
        <input
          className="flex-1 bg-transparent text-white placeholder:text-gray-300 px-3 py-2 border border-yellow-400 rounded-lg outline-none text-sm"
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          className="bg-yellow-400 text-black font-bold px-5 py-2 rounded-lg text-base hover:bg-yellow-500 transition-colors"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;