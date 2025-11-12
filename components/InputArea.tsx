import React from 'react';
import { ImageIcon } from './icons/ImageIcon';

interface InputAreaProps {
  imagePreview: string | null;
  onImageChange: (file: File | null) => void;
  onInterpret: () => void;
  isLoading: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({
  imagePreview,
  onImageChange,
  onInterpret,
  isLoading,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageChange(event.target.files[0]);
    } else {
      onImageChange(null);
    }
  };

  return (
    <div>
      <div className="min-h-[200px] flex justify-center items-center">
        <label htmlFor="image-upload" className="w-full h-full cursor-pointer group">
          <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 h-full flex flex-col justify-center items-center text-slate-400 group-hover:border-purple-500 group-hover:text-purple-400 transition-colors">
            {imagePreview ? (
              <img src={imagePreview} alt="Kahve Falı" className="max-h-48 rounded-lg object-contain" />
            ) : (
              <>
                <ImageIcon className="w-12 h-12 mb-2" />
                <span className="font-semibold">Fincan fotoğrafını seç</span>
                <span className="text-sm">veya buraya sürükle</span>
              </>
            )}
          </div>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={isLoading}
          />
        </label>
      </div>

      <div className="mt-6">
        <button
          onClick={onInterpret}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center shadow-lg shadow-purple-900/20"
        >
          {isLoading ? 'Yorumlanıyor...' : 'Falı Yorumla'}
        </button>
      </div>
    </div>
  );
};