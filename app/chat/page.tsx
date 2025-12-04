'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

// Interfaces remain the same
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'other';
  timestamp: string;
}

interface Contact {
  id: number;
  name: string;
  lastMessage: string;
  status: 'online' | 'offline';
  avatar: string;
}

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: '你好！准备好进入未来的通信了吗？', sender: 'other', timestamp: '10:30 AM' },
    { id: 2, text: '当然！这个界面看起来太酷了。', sender: 'user', timestamp: '10:32 AM' },
    { id: 3, text: '很高兴你喜欢。我们致力于提供最前沿的体验。', sender: 'other', timestamp: '10:33 AM' },
  ]);
  
  const [contacts] = useState<Contact[]>([
    { id: 1, name: '赛博格-01', lastMessage: '数据流接收正常...', status: 'online', avatar: 'A' },
    { id: 2, name: '光影行者', lastMessage: '我在全息甲板等你。', status: 'online', avatar: 'B' },
    { id: 3, name: '霓虹魅影', lastMessage: '代码编译完成。', status: 'offline', avatar: 'C' },
    { id: 4, name: '矩阵哨兵', lastMessage: '系统状态：稳定。', status: 'online', avatar: 'D' },
    { id: 5, name: '深空漫游者', lastMessage: '跃迁引擎准备就绪。', status: 'offline', avatar: 'E' },
  ]);
  
  const [activeContact, setActiveContact] = useState(1);
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    const now = new Date();
    const timeString = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();

    const newMessage: Message = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      timestamp: timeString,
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    setTimeout(() => {
      const replyMessage: Message = {
        id: messages.length + 2,
        text: '信息已加密传输。',
        sender: 'other',
        timestamp: timeString,
      };
      setMessages(prev => [...prev, replyMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleLogout = () => {
    router.push('/login');
  };

  const activeContactInfo = contacts.find(c => c.id === activeContact);

  return (
    <div className="flex h-screen w-full bg-black text-gray-200 font-sans">
      {/* Sidebar */}
      <div className="w-80 bg-black bg-opacity-30 backdrop-blur-lg border-r border-solid border-white border-opacity-10 flex flex-col">
        <div className="p-4 border-b border-solid border-white border-opacity-10 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
            GoChat
          </h1>
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-cyan-500 to-pink-600 flex items-center justify-center font-bold">Y</div>
        </div>
        <div className="p-4">
          <input 
            type="text" 
            placeholder="搜索..." 
            className="w-full px-4 py-2 bg-gray-900 bg-opacity-50 border border-gray-700 rounded-full text-sm focus:outline-none focus:border-cyan-400"
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {contacts.map(contact => (
            <div 
              key={contact.id}
              className={`flex items-center p-4 border-b border-solid border-white border-opacity-5 cursor-pointer transition-all duration-200 ${
                activeContact === contact.id ? 'bg-cyan-500 bg-opacity-20' : 'hover:bg-gray-800 hover:bg-opacity-50'
              }`}
              onClick={() => setActiveContact(contact.id)}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-pink-600 flex items-center justify-center font-bold text-lg">
                  {contact.avatar}
                </div>
                <span className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-black ${
                  contact.status === 'online' ? 'bg-green-400' : 'bg-gray-500'
                }`}></span>
              </div>
              <div className="flex-1 min-w-0 ml-4">
                <h4 className="font-medium truncate">{contact.name}</h4>
                <p className="text-xs text-gray-400 truncate">{contact.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-black bg-opacity-30 backdrop-blur-lg p-4 border-b border-solid border-white border-opacity-10 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-pink-600 flex items-center justify-center font-bold mr-4">
              {activeContactInfo?.avatar}
            </div>
            <div>
              <h3 className="font-medium">{activeContactInfo?.name}</h3>
              <p className="text-xs text-green-400 flex items-center">
                <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${
                  activeContactInfo?.status === 'online' ? 'bg-green-400' : 'bg-gray-500'
                }`}></span>
                {activeContactInfo?.status === 'online' ? '在线' : '离线'}
              </p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-pink-600 bg-opacity-50 rounded-lg hover:bg-opacity-80 transition-all duration-200 text-sm"
          >
            登出
          </button>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map(msg => (
            <div 
              key={msg.id} 
              className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'other' && <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0"></div>}
              <div 
                className={`max-w-lg p-4 rounded-2xl relative animate-fadeIn ${
                  msg.sender === 'user' 
                    ? 'bg-gradient-to-r from-cyan-500 to-pink-600 text-white rounded-br-none' 
                    : 'bg-gray-800 text-gray-200 rounded-bl-none'
                }`}
              >
                <p>{msg.text}</p>
                <div className="text-xs mt-2 text-right opacity-50">{msg.timestamp}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Chat Input */}
        <div className="bg-black bg-opacity-50 p-4 border-t border-solid border-white border-opacity-10 flex items-center gap-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入消息..."
            className="flex-1 px-5 py-3 bg-gray-900 bg-opacity-70 border-2 border-gray-700 rounded-full text-base focus:outline-none focus:border-cyan-400 transition-all duration-300"
          />
          <button
            onClick={handleSendMessage}
            className="w-12 h-12 border-none rounded-full bg-gradient-to-r from-cyan-500 to-pink-600 text-white cursor-pointer flex items-center justify-center text-2xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-110"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
