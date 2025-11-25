'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
    
    try {
      const response = await fetch('http://localhost:8083/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          email: email || undefined, // API allows optional email
          nickname: username, // Use username as nickname if not provided separately
          avatar: undefined, // Avatar is optional
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('注册成功！即将跳转到登录页面...');
        router.push('/login');
      } else {
        setError(data.message || '注册失败，请重试');
      }
    } catch (err) {
      setError('网络错误，请检查API连接');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-95 rounded-2xl shadow-xl p-8 w-full max-w-md backdrop-blur-sm border border-white border-opacity-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            GoChat
          </h1>
          <p className="text-gray-600 mt-2">连接世界的美好</p>
        </div>
        
         <form onSubmit={handleSubmit}>
           <div className="mb-5">
             <label htmlFor="username" className="block mb-2 text-gray-700 font-medium">
               用户名
             </label>
             <input
               type="text"
               id="username"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 placeholder-dark text-gray-800"
               placeholder="请输入用户名"
               required
               disabled={loading}
             />
           </div>
           
           <div className="mb-5">
             <label htmlFor="email" className="block mb-2 text-gray-700 font-medium">
               邮箱
             </label>
             <input
               type="email"
               id="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 placeholder-dark text-gray-800"
               placeholder="请输入邮箱地址"
               required
               disabled={loading}
             />
           </div>
           
           <div className="mb-5">
             <label htmlFor="password" className="block mb-2 text-gray-700 font-medium">
               密码
             </label>
             <input
               type="password"
               id="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 placeholder-dark text-gray-800"
               placeholder="请输入密码"
               required
               disabled={loading}
             />
           </div>
           
           <div className="mb-6">
             <label htmlFor="confirmPassword" className="block mb-2 text-gray-700 font-medium">
               确认密码
             </label>
             <input
               type="password"
               id="confirmPassword"
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
               className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 placeholder-dark text-gray-800"
               placeholder="请再次输入密码"
               required
               disabled={loading}
             />
             {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
           </div>
           
           <button
             type="submit"
             className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg text-base transition-all duration-300 hover:transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
             disabled={loading}
           >
             {loading ? '注册中...' : '注册'}
           </button>
        </form>
        
        <div className="text-center mt-6 text-gray-600">
          已有账号？
          <Link href="/login" className="text-blue-500 font-medium hover:underline">
            立即登录
          </Link>
        </div>
      </div>
    </div>
  );
}