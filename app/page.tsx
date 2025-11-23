'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();

  const handleStartChatting = () => {
    // In a real app, you would check if the user is logged in
    // For now, we'll redirect to the register page
    router.push('/register');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <main className="flex flex-col items-center w-full max-w-2xl bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            GoChat
          </h1>
          <p className="text-xl text-gray-600 max-w-md mx-auto">
            连接世界的美好，与朋友、家人和同事保持联系
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-12">
          <Link 
            href="/register"
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full text-lg transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl text-center"
          >
            创建账户
          </Link>
          <Link 
            href="/login"
            className="px-8 py-4 border-2 border-blue-500 text-blue-500 font-bold rounded-full text-lg transition-all duration-300 hover:bg-blue-500 hover:text-white text-center"
          >
            登录
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8">
          <div className="bg-white bg-opacity-60 p-6 rounded-2xl text-center">
            <div className="text-3xl mb-3">💬</div>
            <h3 className="font-bold text-lg mb-2">即时通讯</h3>
            <p className="text-gray-600 text-sm">快速、可靠的实时消息传递</p>
          </div>
          <div className="bg-white bg-opacity-60 p-6 rounded-2xl text-center">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-bold text-lg mb-2">安全可靠</h3>
            <p className="text-gray-600 text-sm">端到端加密，保护您的隐私</p>
          </div>
          <div className="bg-white bg-opacity-60 p-6 rounded-2xl text-center">
            <div className="text-3xl mb-3">🌐</div>
            <h3 className="font-bold text-lg mb-2">跨平台</h3>
            <p className="text-gray-600 text-sm">支持所有设备，随时随地聊天</p>
          </div>
        </div>
      </main>
    </div>
  );
}