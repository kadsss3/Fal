import React, { useState, useCallback } from 'react';
import { Fortune, UserProfile } from './types';
import { getFortune } from './services/geminiService';
import { Header } from './components/Header';
import { InputArea } from './components/InputArea';
import { FortuneDisplay } from './components/FortuneDisplay';
import { Spinner } from './components/Spinner';
import { ProfileSettings } from './components/ProfileSettings';

function App() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fortune, setFortune] = useState<Fortune | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    zodiac: '',
    interests: '',
    focus: [],
  });
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleImageChange = (file: File | null) => {
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleInterpret = useCallback(async () => {
    if (!imageFile) {
      setError('Lütfen bir fincan fotoğrafı yükleyin.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setFortune(null);

    try {
      const result = await getFortune({
        image: { file: imageFile }
      }, userProfile);
      setFortune(result);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Beklenmedik bir hata oluştu.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [imageFile, userProfile]);

  return (
    <div className="bg-slate-900 min-h-screen text-slate-200 font-sans antialiased">
      <Header onProfileClick={() => setIsProfileModalOpen(true)} />

      {isProfileModalOpen && (
        <ProfileSettings
          profile={userProfile}
          onProfileChange={setUserProfile}
          onClose={() => setIsProfileModalOpen(false)}
        />
      )}

      <main className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="bg-slate-800/50 rounded-2xl shadow-2xl shadow-purple-900/10 backdrop-blur-sm p-6 md:p-8 ring-1 ring-white/5">
          <p className="text-center text-slate-300 mb-6">
            Fincanınızın fotoğrafını yükleyin, mistik yolculuğunuz başlasın.
          </p>
          
          <InputArea
            imagePreview={imagePreview}
            onImageChange={handleImageChange}
            onInterpret={handleInterpret}
            isLoading={isLoading}
          />

          {error && (
            <div className="mt-6 bg-red-500/20 text-red-300 p-4 rounded-lg text-center">
              {error}
            </div>
          )}

          {isLoading && <Spinner />}

          {fortune && !isLoading && (
            <div className="mt-8">
              <FortuneDisplay fortune={fortune} />
            </div>
          )}
        </div>
        <footer className="text-center text-slate-500 text-sm mt-8 pb-4">
          <p>&copy; {new Date().getFullYear()} Mistik Fincan. Yapay zeka ile güçlendirilmiştir.</p>
        </footer>
      </main>
    </div>
  );
}

export default App;