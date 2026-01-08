import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => {
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : undefined;
  return new GoogleGenAI({ apiKey: apiKey || '' });
};

export const generatePostContent = async (topic: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `카지노 에이전시 'NEWER VISION'을 위한 다음 주제의 블로그 포스트를 작성해줘: "${topic}". 
    제목, 짧은 요약(excerpt), 본문 내용을 포함해줘. 
    전문적이고 신뢰감 있는 톤으로 한글로 작성해줘.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          excerpt: { type: Type.STRING },
          content: { type: Type.STRING }
        },
        required: ["title", "excerpt", "content"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const suggestSEOKeywords = async (description: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `다음 서비스를 설명하는 카지노 에이전시 웹사이트의 SEO 키워드를 5개 추천해줘: "${description}". 
    쉼표로 구분된 문자열만 반환해줘.`,
  });
  return response.text.trim();
};