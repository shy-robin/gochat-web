'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Globe, Shield, MessageSquare } from 'lucide-react';
import Logo from '@/components/Logo';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 text-white">
      <main className="flex flex-col items-center w-full max-w-4xl text-center animate-fadeIn">
        
        <div className="mb-10 flex flex-col items-center">
          <Logo className="w-32 h-32 mb-4" />
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            探索未来的通信方式，连接每一个数字角落。
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-16">
          <Link 
            href="/register"
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-pink-600 text-white font-bold rounded-full text-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 hover:transform hover:-translate-y-1 text-center"
          >
            立即加入
          </Link>
          <Link 
            href="/login"
            className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-bold rounded-full text-lg transition-all duration-300 hover:bg-cyan-400 hover:text-black text-center"
          >
            登录
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <FeatureCard
            icon={<MessageSquare size={32} className="text-cyan-400" />}
            title="即时通讯"
            description="光速传递，信息流在指尖实时同步。"
          />
          <FeatureCard
            icon={<Shield size={32} className="text-pink-500" />}
            title="安全可靠"
            description="量子级加密，守护您的每一次数字呼吸。"
          />
          <FeatureCard
            icon={<Globe size={32} className="text-cyan-400" />}
            title="全球互联"
            description="跨越维度，连接全球每一个节点。"
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-black bg-opacity-20 backdrop-blur-lg border border-solid border-white border-opacity-10 rounded-2xl p-6 text-center transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20">
      <div className="flex justify-center items-center mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-xl mb-2 text-gray-100">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}
