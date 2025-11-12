import React from 'react';
import { CoffeeIcon } from './icons/CoffeeIcon';
import { UserIcon } from './icons/UserIcon';

interface HeaderProps {
  onProfileClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onProfileClick }) => {
  return (
    <header className="py-6 md:py-8">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-4 relative">
        <div className="flex-1 flex justify-start"></div>
        <div className="flex items-center justify-center gap-4">
          <CoffeeIcon className="w-10 h-10 text-amber-400" />
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-purple-400 tracking-tight">
            Mistik Fincan
          </h1>
        </div>
        <div className="flex-1 flex justify-end pr-4 md:pr-0">
          <button 
            onClick={onProfileClick}
            aria-label="Profil Ayarları"
            className="p-2 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
          >
            <UserIcon className="w-7 h-7" />
          </button>
        </div>
      </div>
    </header>
  );
};