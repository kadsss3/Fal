
import React from 'react';
import { Fortune } from '../types';
import { HeartIcon } from './icons/HeartIcon';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { StarIcon } from './icons/StarIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';


interface FortuneDisplayProps {
  fortune: Fortune;
}

const FortuneCard: React.FC<{ title: string; children: React.ReactNode, icon: React.ReactNode }> = ({ title, children, icon }) => (
  <div className="bg-slate-800/40 p-5 rounded-xl ring-1 ring-white/10 transform transition-transform duration-300 hover:scale-105 hover:ring-purple-400">
    <div className="flex items-center mb-3">
      <div className="text-purple-400 mr-3">{icon}</div>
      <h3 className="text-lg font-bold text-purple-300">{title}</h3>
    </div>
    <p className="text-slate-300 leading-relaxed">{children}</p>
  </div>
);

export const FortuneDisplay: React.FC<FortuneDisplayProps> = ({ fortune }) => {
  return (
    <div className="space-y-6 animate-fade-in">
       <div className="text-center p-6 bg-gradient-to-br from-purple-900/30 to-slate-800/30 rounded-2xl border border-purple-500/20">
         <div className="flex justify-center mb-3 text-amber-300">
            <SparklesIcon className="w-8 h-8"/>
         </div>
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-purple-300 mb-2">Genel Enerji</h2>
        <p className="text-slate-200 text-lg">{fortune.general_energy}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <FortuneCard title="Aşk & İlişkiler" icon={<HeartIcon className="w-6 h-6"/>}>
          {fortune.love_relationships}
        </FortuneCard>
        <FortuneCard title="Kariyer & Para" icon={<BriefcaseIcon className="w-6 h-6"/>}>
          {fortune.career_money}
        </FortuneCard>
        <FortuneCard title="Gelecek Mesajı" icon={<StarIcon className="w-6 h-6"/>}>
          {fortune.future_message}
        </FortuneCard>
        <FortuneCard title="Özet" icon={<BookOpenIcon className="w-6 h-6"/>}>
          {fortune.summary}
        </FortuneCard>
      </div>
    </div>
  );
};

// Add a simple fade-in animation to tailwind config if possible, or here via CSS
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);

