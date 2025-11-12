import React from 'react';
import { UserProfile } from '../types';

interface ProfileSettingsProps {
  profile: UserProfile;
  onProfileChange: (newProfile: UserProfile) => void;
  onClose: () => void;
}

const zodiacSigns = [
  "Koç", "Boğa", "İkizler", "Yengeç", "Aslan", "Başak",
  "Terazi", "Akrep", "Yay", "Oğlak", "Kova", "Balık"
];

const focusOptions = ["Aşk", "Kariyer", "Para", "Sağlık", "Aile", "Kişisel Gelişim"];

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({ profile, onProfileChange, onClose }) => {
  const handleZodiacChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onProfileChange({ ...profile, zodiac: e.target.value });
  };

  const handleInterestsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onProfileChange({ ...profile, interests: e.target.value });
  };

  const handleFocusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const currentFocus = profile.focus || [];
    if (checked) {
      onProfileChange({ ...profile, focus: [...currentFocus, value] });
    } else {
      onProfileChange({ ...profile, focus: currentFocus.filter((item) => item !== value) });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in-fast" onClick={onClose}>
      <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md m-4 p-6 md:p-8 ring-1 ring-white/10" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-purple-400">
          Profil Ayarları
        </h2>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="zodiac" className="block text-sm font-medium text-slate-300 mb-2">Burcunuz</label>
            <select
              id="zodiac"
              value={profile.zodiac}
              onChange={handleZodiacChange}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
            >
              <option value="">Seçiniz...</option>
              {zodiacSigns.map(sign => <option key={sign} value={sign}>{sign}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="interests" className="block text-sm font-medium text-slate-300 mb-2">İlgi Alanları</label>
            <textarea
              id="interests"
              value={profile.interests}
              onChange={handleInterestsChange}
              placeholder="Örn: seyahat, sanat, teknoloji..."
              rows={3}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Yorumlarda Vurgulanacak Konular</label>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {focusOptions.map(option => (
                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value={option}
                    checked={profile.focus.includes(option)}
                    onChange={handleFocusChange}
                    className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-slate-300">{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
          >
            Kaydet ve Kapat
          </button>
        </div>
      </div>
    </div>
  );
};

const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeInFast {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in-fast {
    animation: fadeInFast 0.3s ease-out forwards;
  }
`;
document.head.appendChild(style);
