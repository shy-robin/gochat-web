'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login logic
    alert('登录成功！即将跳转到聊天页面...');
    router.push('/chat');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div 
        className="w-full max-w-md rounded-2xl p-8 bg-black bg-opacity-20 backdrop-blur-lg border border-solid border-white border-opacity-10 shadow-2xl"
        style={{
          boxShadow: '0 0 20px rgba(0, 170, 255, 0.3), 0 0 40px rgba(255, 0, 255, 0.3)',
        }}
      >
        <div className="text-center mb-8 animate-fadeIn flex flex-col items-center">
          <Logo className="w-24 h-24 mb-4" />
          <p className="text-gray-400 mt-2 text-sm">探索未来的通信方式</p>
        </div>
        
        <form onSubmit={handleSubmit} className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-gray-300 font-medium text-sm">
              邮箱
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 bg-opacity-50 border-2 border-gray-700 rounded-lg text-base text-gray-200 transition-all duration-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50 placeholder-cyber"
              placeholder="请输入邮箱地址"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-gray-300 font-medium text-sm">
              密码
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 bg-opacity-50 border-2 border-gray-700 rounded-lg text-base text-gray-200 transition-all duration-300 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 placeholder-cyber"
              placeholder="请输入密码"
              required
            />
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          </div>
          
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-pink-600 text-white font-semibold rounded-lg text-base transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 hover:transform hover:-translate-y-0.5"
          >
            登录
          </button>
        </form>
        
        <div className="text-center mt-6 text-gray-400 text-sm animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          没有账号？
          <Link href="/register" className="text-cyan-400 font-medium hover:underline hover:text-cyan-300">
            立即注册
          </Link>
        </div>
      </div>
    </div>
  );
}
