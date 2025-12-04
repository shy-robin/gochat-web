'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { createUser } from '@/lib/api/client';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('两次输入的密码不一致！');
      return;
    }
    
    setLoading(true);
    setError('');
    
    const response = await createUser({
      username,
      password,
      email,
      nickname: username,
    });

    setLoading(false);

    if (response.status === 'success') {
      alert('注册成功！即将跳转到登录页面...');
      router.push('/login');
    } else {
      setError(response.message || '注册失败，请重试');
    }
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
          <p className="text-gray-400 mt-2 text-sm">创建你的未来通信账户</p>
        </div>
        
         <form onSubmit={handleSubmit}>
           <div className="mb-5">
             <label htmlFor="username" className="block mb-2 text-gray-300 font-medium text-sm">
               用户名
             </label>
             <input
               type="text"
               id="username"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               className="w-full px-4 py-3 bg-gray-900 bg-opacity-50 border-2 border-gray-700 rounded-lg text-base text-gray-200 transition-all duration-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50 placeholder-cyber"
               placeholder="请输入用户名"
               required
               disabled={loading}
             />
           </div>
           
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
               disabled={loading}
             />
           </div>
           
           <div className="mb-5">
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
               disabled={loading}
             />
           </div>
           
           <div className="mb-6">
             <label htmlFor="confirmPassword" className="block mb-2 text-gray-300 font-medium text-sm">
               确认密码
             </label>
             <input
               type="password"
               id="confirmPassword"
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
               className="w-full px-4 py-3 bg-gray-900 bg-opacity-50 border-2 border-gray-700 rounded-lg text-base text-gray-200 transition-all duration-300 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 placeholder-cyber"
               placeholder="请再次输入密码"
               required
               disabled={loading}
             />
             {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
           </div>
           
           <button
             type="submit"
             className="w-full py-3 bg-gradient-to-r from-cyan-500 to-pink-600 text-white font-semibold rounded-lg text-base transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 hover:transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-wait"
             disabled={loading}
           >
             {loading ? '注册中...' : '注册'}
           </button>
        </form>
        
        <div className="text-center mt-6 text-gray-400 text-sm">
          已有账号？
          <Link href="/login" className="text-cyan-400 font-medium hover:underline hover:text-cyan-300">
            立即登录
          </Link>
        </div>
      </div>
    </div>
  );
}
