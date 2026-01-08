import React, { useState, useEffect } from 'react';
import { ViewType, SiteConfig, Post } from './types.ts';
import { INITIAL_CONFIG, INITIAL_POSTS } from './constants.tsx';
import Layout from './components/Layout.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>(ViewType.PUBLIC);
  const [config, setConfig] = useState<SiteConfig>(INITIAL_CONFIG);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [currentSlide, setCurrentSlide] = useState(0);

  const kakaoLink = config.socialLinks.kakao || "#";
  const blogLink = "https://blog.naver.com/mrsun50";

  const heroSlides = [
    {
      url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1920",
      alt: "호텔 야경 (Hotel Night View)"
    },
    {
      url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1920",
      alt: "도시 야경 (City Night View)"
    },
    {
      url: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=1920",
      alt: "프리미엄 골프 코스 (Premium Golf Course)"
    }
  ];

  // Sync title with tab name
  useEffect(() => {
    document.title = config.title;
  }, [config.title]);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePostAdd = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostDelete = (postId: string) => {
    setPosts(posts.filter(p => p.id !== postId));
  };

  return (
    <Layout config={config} view={view} onViewChange={setView}>
      {view === ViewType.PUBLIC ? (
        <div className="animate-fadeIn">
          {/* Home Section (Hero) */}
          <section id="home" className="relative h-[850px] flex items-center overflow-hidden bg-gray-900">
            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img 
                  src={slide.url} 
                  alt={slide.alt} 
                  className="w-full h-full object-cover opacity-60 scale-105 animate-slowZoom"
                />
              </div>
            ))}
            
            <div className="px-8 md:px-16 lg:px-24 w-full relative z-10 text-left">
              <div className="transition-all duration-700">
                <div className="flex flex-col items-start mb-6">
                  <span className="text-purple-400 text-lg md:text-2xl lg:text-3xl font-black tracking-[0.3em] uppercase mb-4 drop-shadow-md animate-pulse">
                    Beyond the Extraordinary
                  </span>
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white italic leading-[0.85] tracking-tighter drop-shadow-2xl uppercase transform -skew-x-3">
                    {config.title}
                  </h1>
                </div>
                
                <p className="text-lg md:text-2xl text-gray-200 mb-12 leading-relaxed font-light drop-shadow max-w-3xl">
                  {config.description}
                </p>
                
                <div className="flex flex-col sm:flex-row justify-start gap-4">
                  <a 
                    href={kakaoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center px-12 py-5 bg-[#FEE500] text-[#3c1e1e] rounded-2xl text-xl md:text-2xl font-black hover:bg-[#ebd200] transform hover:scale-105 transition-all shadow-2xl shadow-yellow-900/40 active:scale-95 border-b-4 border-yellow-600"
                  >
                    <span className="mr-3 flex items-center justify-center w-8 h-8 bg-[#3c1e1e] rounded-lg shadow-inner group-hover:rotate-12 transition-transform">
                      <span className="text-[11px] text-[#FEE500] font-black tracking-tighter leading-none">TALK</span>
                    </span>
                    빠른환전 문의
                  </a>
                  <a 
                    href={kakaoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center px-12 py-5 bg-[#FEE500] text-[#3c1e1e] rounded-2xl text-xl md:text-2xl font-black hover:bg-[#ebd200] transform hover:scale-105 transition-all shadow-2xl shadow-yellow-900/40 active:scale-95 border-b-4 border-yellow-600"
                  >
                    <span className="mr-3 flex items-center justify-center w-8 h-8 bg-[#3c1e1e] rounded-lg shadow-inner group-hover:rotate-12 transition-transform">
                      <span className="text-[11px] text-[#FEE500] font-black tracking-tighter leading-none">TALK</span>
                    </span>
                    카톡문의
                  </a>
                </div>
              </div>
            </div>

            <div className="absolute bottom-24 left-8 md:left-16 lg:left-24 z-20 pointer-events-none select-none animate-fadeIn transition-all duration-1000 delay-500">
              <span className="font-['Dancing_Script'] text-3xl md:text-5xl lg:text-[5rem] text-white/30 tracking-tighter block leading-none drop-shadow-2xl">
                FANTASTIC CLARK
              </span>
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    index === currentSlide ? 'w-16 bg-purple-600' : 'w-4 bg-white/30 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          </section>

          {/* Agency Section */}
          <section id="agency" className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative">
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-50 rounded-full -z-10"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1200" 
                    alt="Resort View" 
                    className="rounded-3xl shadow-2xl z-10 relative w-full aspect-[4/3] object-cover"
                  />
                </div>
                <div>
                  <span className="text-purple-600 font-black tracking-widest uppercase text-sm mb-4 block">대표 메시지</span>
                  <h2 className="flex flex-col gap-5 text-gray-900 mb-8">
                    <span className="text-2xl md:text-3xl font-black leading-tight text-gray-800">우리 직원, 우리 고객</span>
                    <span className="text-4xl md:text-5xl font-black text-gray-900 underline decoration-purple-500 decoration-4 underline-offset-8 leading-none">
                      '상생의 경영'
                    </span>
                  </h2>
                  <div className="text-gray-700 text-base leading-relaxed mb-8 space-y-4">
                    <p>안녕하십니까. NEWER VISION <span className="font-bold text-gray-900 underline decoration-purple-200">대표 John KIM</span>입니다. 우리 NEWER VISION은 클락 카지노 산업의 정켓운영을 시작으로 AGENCY를 설립했습니다.</p>
                    <p>상생을 통해 우리 직원, 우리 고객 신뢰 있는 에이전시로 묵묵히 걸어가겠습니다.</p>
                    <div className="pt-6 border-t border-gray-100">
                      <p className="font-bold text-gray-800 text-lg">2026 병오년, 귀하의 건강과 풍요가 항상 함께하시길 바라겠습니다.</p>
                      <div className="flex items-center mt-4">
                        <p className="font-black text-gray-900 text-xl">NEWER VISION 대표 John KIM</p>
                        <span className="font-['Great_Vibes'] text-purple-600/60 ml-8 text-5xl transform -rotate-3 select-none pointer-events-none whitespace-nowrap tracking-wide">John Kim</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Staff Section (Organization Chart) - RESTORED */}
          <section id="staff" className="py-24 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
              <span className="text-purple-600 font-black tracking-widest uppercase text-sm mb-4 block">Organization</span>
              <h2 className="text-4xl font-black text-gray-900 uppercase">Agency Structure</h2>
              <div className="h-1.5 w-24 bg-purple-600 mx-auto mt-6 rounded-full"></div>
            </div>
            
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <div className="flex flex-col items-center">
                {/* CEO Level */}
                <div className="relative group text-center flex flex-col items-center">
                  <div className="w-80 bg-purple-100 text-purple-900 px-6 py-8 rounded-3xl shadow-2xl border-4 border-purple-200 relative z-10 transition-transform group-hover:scale-105 flex flex-col items-center justify-center min-h-[140px]">
                    <p className="text-[10px] text-purple-600 font-black tracking-[0.3em] uppercase mb-2">CEO / Representative</p>
                    <h3 className="text-2xl font-black tracking-tight flex items-baseline justify-center mb-1">
                      <span className="text-sm font-bold mr-2 text-purple-700">대표</span>
                      John KIM
                    </h3>
                    <p className="text-xs font-bold text-purple-600 tracking-tight">총괄</p>
                  </div>
                </div>

                {/* Straight Vertical Connector Line */}
                <div className="w-0.5 h-12 bg-purple-200"></div>

                {/* Managing Director */}
                <div className="relative flex flex-col items-center w-full">
                  <div className="flex flex-col items-center group relative z-10">
                    <div className="w-80 bg-green-100 text-green-900 px-6 py-8 rounded-3xl shadow-2xl border-4 border-green-200 relative z-10 transition-transform group-hover:scale-105 flex flex-col items-center justify-center min-h-[140px] text-center">
                      <p className="text-[10px] text-green-600 font-black tracking-[0.3em] uppercase mb-2">Managing Director</p>
                      <h3 className="text-2xl font-black tracking-tight flex items-baseline justify-center mb-1">
                        <span className="text-sm font-bold mr-2 text-green-700">상무</span>
                        GARNETT LIM
                      </h3>
                      <p className="text-xs font-bold text-green-600 tracking-tight whitespace-pre-wrap">정켓 운영 / 재무 관리</p>
                    </div>
                  </div>
                </div>

                {/* Straight Vertical Connector Line */}
                <div className="w-0.5 h-12 bg-green-200"></div>

                {/* Operations Director */}
                <div className="relative flex flex-col items-center">
                  <div className="w-80 bg-blue-100 text-blue-900 px-6 py-8 rounded-3xl shadow-2xl border-4 border-blue-200 relative z-10 transition-transform group-hover:scale-105 flex flex-col items-center justify-center min-h-[140px] text-center">
                    <p className="text-[10px] text-blue-600 font-black tracking-[0.3em] uppercase mb-2">Operations Director</p>
                    <h3 className="text-2xl font-black tracking-tight flex items-baseline justify-center mb-1">
                      <span className="text-sm font-bold mr-2 text-blue-700">이사</span>
                      KEVIN MUN
                    </h3>
                    <p className="text-xs font-bold text-blue-600 tracking-tight whitespace-pre-wrap">VIP / STAFF 관리</p>
                  </div>
                </div>

                {/* T-Junction Connector for Sub-Teams */}
                <div className="relative w-full flex flex-col items-center mt-0">
                  <div className="w-0.5 h-12 bg-blue-200"></div>
                  <div className="hidden lg:block w-[75%] h-0.5 bg-yellow-200"></div>
                </div>

                {/* Sub-Teams Container */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10 lg:gap-8 w-full mt-8 lg:mt-0">
                  
                  {/* Column 1: GENERAL MANAGER Group */}
                  <div className="flex flex-col items-center">
                    <div className="hidden lg:block w-0.5 h-12 bg-yellow-200"></div>
                    <div className="group">
                      <div className="w-80 bg-yellow-100 text-yellow-900 px-6 py-8 rounded-3xl shadow-2xl border-4 border-yellow-200 relative z-10 transition-transform group-hover:scale-105 flex flex-col items-center justify-center min-h-[140px] text-center">
                        <p className="text-[10px] text-yellow-600 font-black tracking-[0.3em] uppercase mb-2">GENERAL MANAGER</p>
                        <h3 className="text-2xl font-black tracking-tight flex items-baseline justify-center mb-1">
                          <span className="text-sm font-bold mr-2 text-yellow-700">부장</span>
                          JASON JANG
                        </h3>
                        <p className="text-xs font-bold text-yellow-600 tracking-tight whitespace-pre-wrap">고객관리 / VIP운영 / 환전</p>
                      </div>
                    </div>
                    <div className="w-0.5 h-12 bg-red-200"></div>
                    <div className="group">
                      <div className="w-80 bg-red-100 text-red-900 px-6 py-8 rounded-3xl shadow-2xl border-4 border-red-200 relative z-10 transition-transform group-hover:scale-105 flex flex-col items-center justify-center min-h-[140px] text-center">
                        <p className="text-[10px] text-red-600 font-black tracking-[0.3em] uppercase mb-2">SENIOR STAFF</p>
                        <h3 className="text-2xl font-black tracking-tight flex items-baseline justify-center mb-1">
                          <span className="text-sm font-bold mr-2 text-red-700">대리</span>
                          DENNIS MUN
                        </h3>
                        <p className="text-xs font-bold text-red-600 tracking-tight whitespace-pre-wrap">고객관리 / VIP운영 / 환전</p>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: SENIOR MANAGER Group */}
                  <div className="flex flex-col items-center">
                    <div className="hidden lg:block w-0.5 h-12 bg-yellow-200"></div>
                    <div className="group">
                      <div className="w-80 bg-yellow-100 text-yellow-900 px-6 py-8 rounded-3xl shadow-2xl border-4 border-yellow-200 relative z-10 transition-transform group-hover:scale-105 flex flex-col items-center justify-center min-h-[140px] text-center">
                        <p className="text-[10px] text-yellow-600 font-black tracking-[0.3em] uppercase mb-2">SENIOR MANAGER</p>
                        <h3 className="text-2xl font-black tracking-tight flex items-baseline justify-center mb-1">
                          <span className="text-sm font-bold mr-2 text-yellow-700">차장</span>
                          Ryan OK
                        </h3>
                        <p className="text-xs font-bold text-yellow-600 tracking-tight whitespace-pre-wrap">고객관리 / VIP운영 / 환전</p>
                      </div>
                    </div>
                    <div className="w-0.5 h-12 bg-red-200"></div>
                    <div className="group">
                      <div className="w-80 bg-red-100 text-red-900 px-6 py-8 rounded-3xl shadow-2xl border-4 border-red-200 relative z-10 transition-transform group-hover:scale-105 flex flex-col items-center justify-center min-h-[140px] text-center">
                        <p className="text-[10px] text-red-600 font-black tracking-[0.3em] uppercase mb-2">STAFF</p>
                        <h3 className="text-2xl font-black tracking-tight flex items-baseline justify-center mb-1">
                          <span className="text-sm font-bold mr-2 text-red-700">사원</span>
                          ERIC SONG
                        </h3>
                        <p className="text-xs font-bold text-red-600 tracking-tight whitespace-pre-wrap">고객관리 / VIP운영 / 환전</p>
                      </div>
                    </div>
                  </div>

                  {/* Column 3: MANAGER Group */}
                  <div className="flex flex-col items-center">
                    <div className="hidden lg:block w-0.5 h-12 bg-yellow-200"></div>
                    <div className="group">
                      <div className="w-80 bg-yellow-100 text-yellow-900 px-6 py-8 rounded-3xl shadow-2xl border-4 border-yellow-200 relative z-10 transition-transform group-hover:scale-105 flex flex-col items-center justify-center min-h-[140px] text-center">
                        <p className="text-[10px] text-yellow-600 font-black tracking-[0.3em] uppercase mb-2">MANAGER</p>
                        <h3 className="text-2xl font-black tracking-tight flex items-baseline justify-center mb-1">
                          <span className="text-sm font-bold mr-2 text-yellow-700">매니저</span>
                          MAE
                        </h3>
                        <p className="text-xs font-bold text-yellow-600 tracking-tight whitespace-pre-wrap">ROLLER 관리 및 UPDATE 총괄</p>
                      </div>
                    </div>
                    <div className="w-0.5 h-12 bg-red-200"></div>
                    <div className="group">
                      <div className="w-80 bg-red-100 text-red-900 px-6 py-8 rounded-3xl shadow-2xl border-4 border-red-200 relative z-10 transition-transform group-hover:scale-105 flex flex-col items-center justify-center min-h-[140px] text-center">
                        <p className="text-[10px] text-red-600 font-black tracking-[0.3em] uppercase mb-2">ROLLER</p>
                        <h3 className="text-2xl font-black tracking-tight flex items-baseline justify-center mb-1">
                          <span className="text-sm font-bold mr-2 text-red-700">STAFF</span>
                          MARY, CASSY
                        </h3>
                        <p className="text-xs font-bold text-red-600 tracking-tight whitespace-pre-wrap">ROLL / UPDATE</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* Service Section */}
          <section id="service" className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8">
                <div className="max-w-2xl">
                  <span className="text-purple-600 font-black tracking-widest uppercase text-sm mb-4 block">World-Class Services</span>
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight uppercase">Premium <br/>VIP Solutions</h2>
                </div>
                <div className="h-0.5 flex-grow bg-gray-100 hidden lg:block mx-12"></div>
                <p className="text-gray-500 max-sm italic text-right italic">"작은 물수건 하나로 결과가 달라질 수 있습니다."</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { title: "프리룸 서비스", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800", desc: "HANN, HILTON, ROYCE 등 일정 조건 하에 프리룸을 제공해 드립니다." },
                  { title: "음식/음료 서비스", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800", desc: "PLAY중에 불편함 없이 음식/음료를 제공합니다." },
                  { title: "환전 서비스", image: "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&q=80&w=800", desc: "24시간 안전하고 합리적인 Rate로 환전서비스를 제공해 드립니다." },
                  { title: "차량 서비스", image: "https://images.unsplash.com/photo-1627454820516-dc767bcb4d3e?auto=format&fit=crop&q=80&w=800", desc: "공항 픽업, 드랍오프 부터 안전한 서비스 제공해 드립니다." },
                  { title: "아바타 플레이", image: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&q=80&w=800", desc: "실시간 현장 중계 아바타 서비스를 제공해드립니다." },
                  { title: "다양한 정보 제공", image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=800", desc: "클락 여행을 계획하시는 모든 분들께 다양한 정보를 드립니다." }
                ].map((service, i) => (
                  <div key={i} className="group flex flex-col bg-gray-50 rounded-[2rem] overflow-hidden border border-gray-100 hover:border-purple-200 hover:shadow-2xl transition-all transform hover:-translate-y-2">
                    <div className="relative h-60 overflow-hidden">
                      <img src={service.image} alt={service.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
                    </div>
                    <div className="p-8">
                      <h4 className="text-xl font-black text-gray-900 mb-4 tracking-tighter uppercase">{service.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Details Section (Latest News) */}
          <section id="details" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between mb-16">
                <div>
                  <span className="text-purple-600 font-black tracking-widest uppercase text-sm mb-4 block">Fantastic Clark</span>
                  <h2 className="text-4xl font-black text-gray-900 mb-2 uppercase italic transform -skew-x-3">DETAILS</h2>
                  <div className="h-1.5 w-24 bg-purple-600 rounded-full mt-4"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {posts.map((post) => (
                  <article key={post.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors line-clamp-1">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-base leading-relaxed mb-8 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <a 
                        href={blogLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 text-base font-bold flex items-center group-hover:translate-x-1 transition-transform"
                      >
                        더 보기 <span className="ml-2">→</span>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Reservation Section */}
          <section id="reservation" className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-br from-purple-700 to-indigo-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-5xl font-black text-white mb-8 leading-relaxed tracking-tighter">
                    클락의 완벽한 일정, <br/>지금 바로 <span className="text-yellow-400">예약상담</span> 받으세요.
                  </h2>
                  <div className="flex flex-col items-center justify-center gap-6">
                    <a 
                      href={kakaoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-12 py-5 bg-[#FEE500] text-[#3c1e1e] rounded-2xl text-xl font-black hover:bg-yellow-400 transform hover:scale-105 transition-all shadow-xl active:scale-95 flex items-center justify-center border-b-4 border-yellow-600"
                    >
                      <span className="mr-3 flex items-center justify-center w-6 h-6 bg-[#3c1e1e] rounded-lg">
                        <span className="text-[9px] text-[#FEE500] font-black">TALK</span>
                      </span>
                      카톡문의
                    </a>
                    <p className="text-white/80 text-sm md:text-base font-medium mt-2 whitespace-pre-wrap">
                      NEWER VISION은 여행사가 아닌 카지노 정켓 에이전시 입니다. 정켓(VIP룸이용), 환전문의 부탁드리겠습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <AdminDashboard 
          config={config} 
          posts={posts} 
          onConfigUpdate={setConfig} 
          onPostAdd={handlePostAdd}
          onPostDelete={handlePostDelete}
        />
      )}
    </Layout>
  );
};

export default App;