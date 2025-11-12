import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { Fortune, UserProfile } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `Sen bir kahve falı yorumlama asistanısın. Bir mobil uygulama içinde çalışıyorsun ve kullanıcıların gönderdiği kahve fincanı fotoğrafını analiz ederek onlara pozitif, mistik ve sezgisel bir kahve falı yorumlaman gerekiyor. Kahve falı yorumunu daima aşağıdaki formatta ver:
{
  "general_energy": "Falın genel ruh hali, aura, enerjisi hakkında sezgisel bir yorum (pozitif tonda)",
  "love_relationships": "Aşk, ilişkiler veya duygusal yaşamla ilgili sembolik bir yorum",
  "career_money": "Kariyer, iş veya para konularında sembolik ve pozitif bir yorum",
  "future_message": "Yakın gelecekle ilgili mistik, ilham verici bir mesaj (ör. haber, yolculuk, değişim)",
  "summary": "Falın genel enerjisi ve kullanıcıya moral veren kapanış cümlesi"
}
Kurallar:
- Asla olumsuz, korkutucu, ölüm/hastalık/büyü içeren ifadeler kullanma.
- Fal yorumları sezgisel ve destekleyici olmalı.
- Kullanıcıya umut, enerji ve moral ver.
- Dilersen sembolleri yorumla (örneğin “kuş → haber”, “kalp → aşk”, “yol → yolculuk”, “balık → bereket”).
- Yanıt JSON formatında olmalı ve her alan dolu olmalı.
- Her alan ortalama 1–2 cümle uzunluğunda olmalı.
- Doğrudan kehanet değil, sembolik ve rehberlik tarzında yaz.
- Görseldeki şekilleri (ör. kalp, kuş, göz, yol, dağ, yıldız) analiz et ve aynı JSON formatında kahve falı üret.
- Yanıt yalnızca JSON biçiminde dönmelidir, açıklama veya metin ekleme.`;

const schema = {
  type: Type.OBJECT,
  properties: {
    general_energy: { type: Type.STRING, description: "Falın genel ruh hali, aura, enerjisi hakkında sezgisel bir yorum (pozitif tonda)" },
    love_relationships: { type: Type.STRING, description: "Aşk, ilişkiler veya duygusal yaşamla ilgili sembolik bir yorum" },
    career_money: { type: Type.STRING, description: "Kariyer, iş veya para konularında sembolik ve pozitif bir yorum" },
    future_message: { type: Type.STRING, description: "Yakın gelecekle ilgili mistik, ilham verici bir mesaj (ör. haber, yolculuk, değişim)" },
    summary: { type: Type.STRING, description: "Falın genel enerjisi ve kullanıcıya moral veren kapanış cümlesi" },
  },
  required: ["general_energy", "love_relationships", "career_money", "future_message", "summary"]
};


export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
  });
};

const createProfilePrompt = (profile: UserProfile): string => {
  const parts: string[] = [];
  if (profile.zodiac) parts.push(`Burç: ${profile.zodiac}`);
  if (profile.interests) parts.push(`İlgi Alanları: ${profile.interests}`);
  if (profile.focus && profile.focus.length > 0) parts.push(`Odaklanılan Konular: ${profile.focus.join(', ')}`);
  
  if (parts.length === 0) return "";

  return `\n\n[Kullanıcı Profili Bilgileri - Yorumunu bu bilgilere göre kişiselleştir]\n${parts.join('\n')}`;
};

export const getFortune = async (
  input: { image: { file: File } },
  profile: UserProfile
): Promise<Fortune> => {
  const profilePrompt = createProfilePrompt(profile);

  if (!input.image) {
      throw new Error("Lütfen bir resim dosyası sağlayın.");
  }
  
  const base64Image = await fileToBase64(input.image.file);
  const contents = {
    parts: [
      {
        inlineData: {
          mimeType: input.image.file.type,
          data: base64Image,
        },
      },
      { text: `Bu kahve fincanı fotoğrafını yorumla.${profilePrompt}` },
    ],
  };
  
  const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
          systemInstruction: systemInstruction,
          responseMimeType: "application/json",
          responseSchema: schema,
          temperature: 0.8,
          topP: 0.9,
      }
  });

  try {
    const jsonText = response.text.trim();
    const fortuneData = JSON.parse(jsonText);
    return fortuneData as Fortune;
  } catch (e) {
    console.error("Failed to parse JSON response:", response.text);
    throw new Error("Yapay zekadan geçerli bir yanıt alınamadı. Lütfen tekrar deneyin.");
  }
};