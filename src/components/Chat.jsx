import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8004'); 

const LOCAL_STORAGE_KEY = 'chat_messages';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      socket.emit('send_message', { text: input });
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-[600px] md:h-[100vh] sm:h-[100vh] min-h-0 bg-gradient-to-b from-black to-pink-900 p-4 font-sans">
      <div className="flex-1 min-h-0 overflow-y-auto hide-scrollbar">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={
              msg.offensive
                ? 'border-2 border-yellow-400 bg-yellow-900/20 text-yellow-300 font-bold rounded-xl px-6 py-4 mb-3 text-lg text-center'
                : 'bg-[#18111A] text-white rounded-xl px-6 py-4 mb-3 text-lg font-normal'
            }
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="flex items-center border-t border-pink-900 mt-6 pt-4">
        <input
          className="w-full bg-transparent text-white placeholder:text-gray-300 px-0 py-4 border-none outline-none text-lg"
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          className="ml-2 font-bold text-black text-xl bg-transparent hover:underline focus:outline-none"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;