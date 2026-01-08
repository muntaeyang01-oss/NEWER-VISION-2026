import React, { useState } from 'react';
import { SiteConfig, Post } from '../types';
import { generatePostContent, suggestSEOKeywords } from '../services/geminiService';

interface AdminDashboardProps {
  config: SiteConfig;
  posts: Post[];
  onConfigUpdate: (newConfig: SiteConfig) => void;
  onPostAdd: (newPost: Post) => void;
  onPostDelete: (postId: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ config, posts, onConfigUpdate, onPostAdd, onPostDelete }) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'cms' | 'seo'>('settings');
  const [isGenerating, setIsGenerating] = useState(false);
  const [newTopic, setNewTopic] = useState('');

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('social_')) {
      const socialKey = name.split('_')[1];
      onConfigUpdate({
        ...config,
        socialLinks: { ...config.socialLinks, [socialKey]: value }
      });
    } else if (name.startsWith('seo_')) {
       const seoKey = name.split('_')[1];
       onConfigUpdate({
         ...config,
         seo: { ...config.seo, [seoKey]: value }
       });
    } else {
      onConfigUpdate({ ...config, [name]: value });
    }
  };

  const handleAISuggestPost = async () => {
    if (!newTopic) return;
    setIsGenerating(true);
    try {
      const result = await generatePostContent(newTopic);
      const newPost: Post = {
        id: Date.now().toString(),
        title: result.title,
        excerpt: result.excerpt,
        content: result.content,
        imageUrl: `https://picsum.photos/seed/${Date.now()}/800/600`,
        date: new Date().toISOString().split('T')[0],
        category: '새 소식'
      };
      onPostAdd(newPost);
      setNewTopic('');
      alert('AI가 포스트를 성공적으로 생성했습니다!');
    } catch (error) {
      console.error(error);
      alert('AI 생성 중 오류가 발생했습니다.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAISuggestSEO = async () => {
    setIsGenerating(true);
    try {
      const keywords = await suggestSEOKeywords(config.description);
      onConfigUpdate({ ...config, seo: { ...config.seo, keywords } });
      alert('SEO 키워드가 업데이트되었습니다.');
    } catch (error) {
      alert('SEO 추천 중 오류 발생');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-xl my-8 border border-purple-100">
      <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="w-2 h-8 bg-purple-600 rounded-full mr-3"></span>
          어드민 대시보드
        </h2>
        <div className="flex space-x-2">
          {['settings', 'cms', 'seo'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {tab === 'settings' ? '기본 설정' : tab === 'cms' ? '콘텐츠 관리' : 'SEO 도구'}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">웹사이트 제목</label>
              <input 
                name="title" value={config.title} onChange={handleConfigChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">사이트 설명</label>
              <textarea 
                name="description" value={config.description} onChange={handleConfigChange} rows={3}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">카카오톡 상담 링크 (Full URL)</label>
                <input name="social_kakao" value={config.socialLinks.kakao} onChange={handleConfigChange} className="w-full px-4 py-2 border border-gray-200 rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">인스타그램 ID</label>
                <input name="social_instagram" value={config.socialLinks.instagram} onChange={handleConfigChange} className="w-full px-4 py-2 border border-gray-200 rounded-xl" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cms' && (
          <div className="space-y-8">
            <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
              <h3 className="font-bold text-purple-900 mb-4 flex items-center">
                ✨ AI 콘텐츠 생성기
              </h3>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="예: 클락 풀빌라 추천, 카지노 이용 팁..." 
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  className="flex-grow px-4 py-2 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500"
                />
                <button 
                  onClick={handleAISuggestPost}
                  disabled={isGenerating || !newTopic}
                  className="px-6 py-2 bg-purple-600 text-white rounded-xl font-bold disabled:bg-gray-400 hover:bg-purple-700 transition-colors"
                >
                  {isGenerating ? '작성 중...' : '포스트 생성'}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-gray-900">최근 작성된 포스트</h3>
              <div className="grid grid-cols-1 gap-3">
                {posts.map(post => (
                  <div key={post.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                    <div>
                      <h4 className="font-semibold text-gray-800">{post.title}</h4>
                      <p className="text-xs text-gray-400">{post.date} | {post.category}</p>
                    </div>
                    <button 
                      onClick={() => onPostDelete(post.id)}
                      className="text-red-400 hover:text-red-600 text-sm font-medium"
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="space-y-6">
            <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl">
              <h3 className="font-bold text-blue-900 mb-2">검색 엔진 최적화 (SEO)</h3>
              <p className="text-sm text-blue-700 mb-4">구글 등 검색 엔진에서 노출 확률을 높이기 위한 설정을 관리합니다.</p>
              <button 
                onClick={handleAISuggestSEO}
                disabled={isGenerating}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700"
              >
                AI가 키워드 분석 및 추천하기
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">메타 키워드</label>
              <input 
                name="seo_keywords" value={config.seo.keywords} onChange={handleConfigChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">작성자 명 (Author)</label>
              <input 
                name="seo_author" value={config.seo.author} onChange={handleConfigChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;