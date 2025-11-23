'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

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
    { id: 1, text: '你好！今天过得怎么样？', sender: 'other', timestamp: '10:30 AM' },
    { id: 2, text: '还不错呢，刚刚完成了一个项目！你呢？', sender: 'user', timestamp: '10:32 AM' },
    { id: 3, text: '真棒！我也在忙一个新项目，有点挑战性。', sender: 'other', timestamp: '10:33 AM' },
    { id: 4, text: '听起来很有趣，是关于什么的项目？', sender: 'user', timestamp: '10:35 AM' },
    { id: 5, text: '是一个聊天应用的前端设计，想要做得美观一些。', sender: 'other', timestamp: '10:36 AM' },
    { id: 6, text: '那正好，我们正在做的项目很相似！', sender: 'user', timestamp: '10:37 AM' },
  ]);
  
  const [contacts] = useState<Contact[]>([
    { id: 1, name: '张三', lastMessage: '今天天气真好！', status: 'online', avatar: 'A' },
    { id: 2, name: '李四', lastMessage: '在吗？有个问题想问你', status: 'online', avatar: 'B' },
    { id: 3, name: '王五', lastMessage: '昨天的会议记录已发送', status: 'offline', avatar: 'C' },
    { id: 4, name: '赵六', lastMessage: '谢谢你的帮助！', status: 'online', avatar: 'D' },
    { id: 5, name: '孙七', lastMessage: '明天记得开会', status: 'offline', avatar: 'E' },
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

    // 模拟回复
    setTimeout(() => {
      const replyMessage: Message = {
        id: messages.length + 2,
        text: '收到你的消息了！这是一个自动回复。',
        sender: 'other',
        timestamp: timeString,
      };
      setMessages(prev => [...prev, replyMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-500 font-bold mr-2">G</div>
          <span className="text-xl font-bold">GoChat</span>
        </div>
        <div className="flex items-center">
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-blue-500 font-bold mr-2">Y</div>
          <span>用户名</span>
          <button 
            onClick={handleLogout}
            className="ml-4 px-3 py-1 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition"
          >
            登出
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-72 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <input 
              type="text" 
              placeholder="搜索联系人..." 
              className="w-full px-4 py-2 border border-gray-300 rounded-full text-sm"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {contacts.map(contact => (
              <div 
                key={contact.id}
                className={`flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  activeContact === contact.id ? 'bg-indigo-50' : ''
                }`}
                onClick={() => setActiveContact(contact.id)}
              >
                <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold mr-4 text-lg">
                  {contact.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">{contact.name}</h4>
                  <p className="text-xs text-gray-500 truncate">{contact.lastMessage}</p>
                </div>
                <div className={`inline-block w-2.5 h-2.5 rounded-full mr-1 ${
                  contact.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {/* Chat Header */}
          <div className="bg-white p-4 border-b border-gray-200 flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold mr-4">
              {contacts.find(c => c.id === activeContact)?.avatar}
            </div>
            <div>
              <h3 className="font-medium">{contacts.find(c => c.id === activeContact)?.name}</h3>
              <p className="text-xs">
                <span className={`inline-block w-2.5 h-2.5 rounded-full mr-1 ${
                  contacts.find(c => c.id === activeContact)?.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                }`}></span>
                {contacts.find(c => c.id === activeContact)?.status === 'online' ? '在线' : '离线'}
              </p>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map(msg => (
              <div 
                key={msg.id} 
                className={`max-w-[70%] p-3 mb-4 rounded-2xl relative animate-fadeIn ${
                  msg.sender === 'user' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white self-end ml-auto rounded-br-none' 
                    : 'bg-white self-start rounded-bl-none'
                }`}
              >
                {msg.text}
                <div className="text-xs mt-1 text-right opacity-70">{msg.timestamp}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat Input */}
          <div className="bg-white p-4 border-t border-gray-200 flex items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="输入消息..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full text-base mr-2"
            />
            <button
              onClick={handleSendMessage}
              className="w-11 h-11 border-none rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white cursor-pointer flex items-center justify-center text-lg"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}