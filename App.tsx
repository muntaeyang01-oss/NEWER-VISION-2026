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

  const serviceItems = [
    { 
      title: "프리룸 서비스", 
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800", 
      desc: "HANN, HILTON, ROYCE 카지노 숙소 등 일정 조건 하에 프리룸을 제공해 드립니다.",
      titleColor: "text-purple-600",
      bgSubtle: "bg-purple-50/60"
    },
    { 
      title: "음식/음료 서비스", 
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=800", 
      desc: "PLAY중에 불편함이 없으시도록 음식/음료 및 정켓 서비스를 제공합니다.",
      titleColor: "text-indigo-600",
      bgSubtle: "bg-indigo-50/60"
    },
    { 
      title: "환전 서비스", 
      image: "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&q=80&w=800", 
      desc: (
        <>
          페소 환전, 원화 환전, 달러 환전 등 24시간 안전하고 합리적인 Rate로 환전 서비스를 제공해 드립니다. <span className="font-bold">HANN, ROYCE, HILTON 등 클락 / 앙헬레스 전역에서</span> 필요하신 분께 서비스 제공해 드립니다.
        </>
      ),
      titleColor: "text-blue-600",
      bgSubtle: "bg-blue-50/60"
    },
    { 
      title: "차량 서비스", 
      image: "https://images.unsplash.com/photo-1627454820516-dc767bcb4d3e?auto=format&fit=crop&q=80&w=800", 
      desc: "공항 픽업, 드랍오프 부터 카지노에서 고객님의 원하시는 곳까지 안전한 차량서비스 제공해 드립니다.",
      titleColor: "text-emerald-600",
      bgSubtle: "bg-emerald-50/60"
    },
    { 
      title: "아바타 플레이", 
      image: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&get=80&w=800", 
      desc: "일정 때문에 클락 방문이 어려우신 분들께 실시간 현장 중계 아바타 서비스를 제공해 드립니다. 수 십명의 기존 고객들이 이용중이시며, 안전하고, 투명한, 실시간 아바타 서비스가 필요하신 분은 바로 문의해 주십시오.",
      titleColor: "text-rose-600",
      bgSubtle: "bg-rose-50/60"
    },
    { 
      title: "확실한 CARE", 
      image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=800", 
      desc: "골프, 유흥, 맛집, 쇼핑, 마사지 등 클락여행의 전반적인 정보를 공유하고 카지노 이외의 모든 서비스도 확실하게 케어해드립니다.",
      titleColor: "text-amber-600",
      bgSubtle: "bg-purple-50/60"
    }
  ];

  const vipTips = [
    {
      title: "프리게임(FREE GAME)",
      content: "일반객장(일명 마바리)과 정켓의 가장 큰 차이이자 바카라 게임의 핵심은 단연 프리게임 이라고 자신있게 말씀드릴 수 있습니다. 이유가 궁금하신 분은 상담해드리겠습니다.",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100"
    },
    {
      title: "방해꾼님들 제발......",
      content: "일반 객장(일명 마바리)과 또 다른 점은, 플레이에 방해요소가 현저하게 적다는 점이다. 누구나 일반객장에서 경험해봤을 것이다. 게임 잘 하고 있다가 갑자기 불청객들이 옆에 와서 나와 반대쪽을 소액으로 가서 멘탈을 흔들질 않나. 오만 사이드를 다 가서 게임 시간을 늦추질 않나. 어떤 때는 특정인에게 꽂혀서 나도 모르게 복수 벳을 가고 있는 내 모습을 인지하지만, 게임은 이미 끝나있다. 방해꾼 없이 오롯이 나만을 위한 베팅을 할 수 있다. 이것이 내 멘탈유지에 굉장히 중요하다.",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100"
    },
    {
      title: "나만을 위한 테이블이야",
      content: "바카라 게임을 하다보면 어느 순간 프리게임을 써도 잘 안풀리는 순간이 있다. 그럴 때는 카드를 과감히 바꾸라고 조언한다. 바꿔야한다. 딜러의 플레이속도가 나의 호흡과 맞지 않을 때도 있다. 바꿔야 한다. 또 어떤 딜러는 기가 세게 느껴진다. 바꿔야한다. 베팅은 이기적이어야한다. 나를 위한, 내 돈을 위한 이기적인 플레이를 해야한다. 자고 일어나면 현실이다.",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-100"
    },
    {
      title: "흡연자의 고충",
      content: "필자는 일반객장에서 아주 가끔 유비현덕과 같은 현자를 만나곤 한다. 게임 도중에 흡연을 하러 머리도 식힐겸 흡연장을 가시는 분들을 본다. 굉장히 스마트하다. 페이스 조절을 하는 거다. 하지만 이 또한 게임의 방해요소임에 틀림없다. 이기고 있을 때나 가능한 이야기고, 지고 있을 때 이 또한 방해 요소다. 멘탈게임에서 페이스가 끊기거나 방해요소가 있으면 그게 무엇이든 최소화 해야한다.",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-100"
    },
    {
      title: "내 편을 활용하라",
      content: "VIP에는 에이전시가 있고 그 회사에 에이전트가 있고 롤러가 있다. 바카라게임은 멘탈게임이기 때문에 정말 괜찬은 에이전트를 만나야 한다. 내가 기분이 다운될 때 으샤으샤 함께 기를 살려야 하며 기분이 너무 들떠있을 때 겸손하며 플레이를 이어갈 수 있는 노련한 조력자가 분명히 필요하다. 때로는 딜러와 때로는 롤러와 때로는 에이전트와 기분 좋게 플레이를 이어나가야 한다. 일반객장에서나 정켓에서나 항상 사단은 내 기분이 좋지 않을 때 일어나고 깊어진다. 지하 4층이 끝인줄 알았는데 지하가 10층까지 있었다. 무슨 말인지 공감이 갈 것이다. 게임은 항상 기분 좋게 진행해야 좋은 결과가 있다.",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-100"
    },
    {
      title: "수 없이 찾아오는 역경, 이겨내라",
      content: "일반객장에서의 방해요소를 말끔하게 제거 한 후 정켓에서는 이제 자신과의 싸움이 시작된다. 바카라는 유혹이 많다. 인간의 욕심이 끝이 없고 인간의 복구욕은 그 어느 욕구보다 강하다. 적당히가 어렵다는 말이다. 감정조절이 어렵다면, 자신과의 싸움이 두렵다면 최선을 다해서 환경을 만들자. 그 중에 하나가 철저한 교육이고 자기암시다. 한국인은 5000페소를 가서 지면 10000페소를 가고, 10000페소를 이기면 이긴돈을 잃을까봐 아까워서 5000페소를 간다. 중국인은 5000페소 를 가서 이기면 10000페소를 간다. 반대로 10000페소를 가서 틀리면 5000페소를 가서 페이스를 조절한다. 이런 베팅 기법부터 일어나야 할 때를 아는자가 되는 방법등 수 없이 많은 교육과 조언은 베테랑에게도 필요한 필수 과정이다. 교육과 자기암시만이 자신과의 싸움에서 이길 수 있는 확률을 높인다.",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-100"
    },
    {
      title: "바카라는 종합예술 이다.",
      content: "환경적인 변수, 그날의 운과 컨디션, 조력자 에이전트와의 합 등등 게임에서 이기기 위해서는 이러한 조건들을 잘 버물러서 내 것으로 만든 다음 적당한 운으로 승리를 가져오는, 음악으로 보면 오케스트라 드라마로 보면 대하드라마 60부작도 부족하다 할 수 있는 희로애락이 서려있는 종합예술이다. 그래서 하고 싶은 말도 너무 많은 것 같다. 필자 역시 이기면 게임, 지면 도박이란 말에 공감한다. 이기면 뭘 해도 즐겁고 지면 뭘 해도 슬프다. 그리고 수 많은 손님들이 좋은 쪽이건 나쁜 쪽이건 말도 안되는 상황들을 만드는 모습도 수도 없이 경험했다. 제법 많은 손님들과 꽤 많은 게임을 소화 하면서 그 경험을 바탕으로 해드리고 싶은 말이 너무 많지만 이 말로 마무리 하고 싶다.\n\n필자는 수 없이 많은 고객들과 울고 웃었다. 플레이어의 마음이 되어 경기에 임했고 함께 스트레스도 풀었고 함께 여독도 풀었다. 지든 이기든 끝까지 함께 울고 웃으면서 내 보람과 정체성도 찾았다. 그리고 진심은 항상 서로가 알았다. 어렵지만, 그래서 더 재밌는 이 게임에 임하는 모든 이들이, 부디 좋은 에이전트를 만나서 더 나은 조건에서 조금이라도 더 좋은 결과를 가지고 즐거운 여행이 되시길 마지막으로 바래본다.",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-100"
    }
  ];

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
                    index === currentSlide ? 'w-16 bg-purple-600' : 'text-white/30 w-4 bg-white/30 hover:bg-white'
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
                    <p>안녕하십니까. NEWER VISION <span className="font-bold text-gray-900 underline decoration-purple-200">대표 JOHN KIM</span> 입니다.</p>
                    <p>우리 NEWER VISION은 카지노 산업의 정켓운영을 시작하여 에이전시를 설립했으며, 필리핀 클락 카지노 발전의 발판 역할을 해 왔습니다. 또한, 코로나 시기에도 끝까지 견디면서 저력을 보여 왔습니다.</p>
                    <p>현재 카지노 산업은 유례 없는 경기의 혹한기를 겪고 있으나, 이러한 위기를 극복하여 성장할 수 있는 DNA가 NEWER VISION 에는 내재되어 있습니다.</p>
                    <p>이를 바탕으로 어떠한 상황 속에서도 ‘최고의 경쟁력’을 가진 회사로 도약하기 위해 고객님들께 더 나은 서비스를 제공하고 있습니다. 비슷해 보이지만 분명히 다른 차별화를 통해 고객님께 안전하고 의지할 수 있는 쉼터가 되겠습니다.</p>
                    <p>상생을 통해 사람을 잃지 않는 회사로 신뢰 있는 에이전시로 묵묵히 걸어가겠습니다.</p>
                    <div className="pt-6 border-t border-gray-100">
                      <p className="font-bold text-gray-800 text-lg">2026 병오년, 귀하의 건강과 풍요가 항상 함께하시길 바라겠습니다.</p>
                      <div className="flex items-center mt-6 relative group">
                        <div className="flex flex-col font-black text-gray-900 text-lg md:text-xl leading-tight relative z-10">
                          <span>NEWER VISION</span>
                          <span>대표 JOHN KIM</span>
                        </div>
                        <div className="relative ml-4 md:ml-8">
                          <span className="font-['Mr_De_Haviland'] text-purple-600/80 text-6xl md:text-8xl transform -rotate-6 select-none pointer-events-none whitespace-nowrap tracking-tighter signature-stroke transition-all group-hover:text-purple-700">
                            John Kim
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Staff Section (Organization Chart) */}
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
              <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 gap-8">
                <div className="max-w-2xl text-left">
                  <span className="text-purple-600 font-black tracking-widest uppercase text-sm mb-4 block">World-Class Services</span>
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight uppercase">Premium <br/>VIP Solutions</h2>
                </div>
                <div className="h-0.5 flex-grow bg-gray-100 hidden lg:block mx-12"></div>
                <p className="text-purple-400 italic text-left lg:text-right">"작은 물수건 하나로 결과가 달라질 수 있습니다."</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {serviceItems.map((service, i) => (
                  <div key={i} className="group flex flex-col bg-gray-50 rounded-[2rem] overflow-hidden border border-gray-100 hover:border-purple-200 hover:shadow-2xl transition-all transform hover:-translate-y-2">
                    <div className="relative h-60 overflow-hidden">
                      <img src={service.image} alt={service.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
                    </div>
                    <div className="flex-grow flex flex-col">
                      <div className="px-8 pt-8">
                        <h4 className="text-xl font-black mb-4 tracking-tighter uppercase flex items-center flex-wrap justify-center">
                          <span className="text-gray-400 font-medium text-base mr-1.5 shrink-0">뉴어비전</span>
                          <span className={service.titleColor}>{service.title}</span>
                        </h4>
                      </div>
                      <div className={`mx-4 mb-4 p-6 rounded-2xl ${service.bgSubtle} transition-colors group-hover:bg-white/40`}>
                        <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* VIP TIP Section */}
          <section id="viptip" className="py-24 bg-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <span className="text-blue-600 font-black tracking-widest uppercase text-sm mb-4 block">Exclusive Advice</span>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase leading-relaxed md:leading-loose">
                  정켓(일명 VIP룸)이용은 <br /> 선택이지만, 필수다.
                </h2>
                <div className="h-1.5 w-24 bg-blue-600 mx-auto mt-6 rounded-full"></div>
                <p className="mt-8 text-black max-w-2xl mx-auto italic font-bold">
                  뉴어비전 ACE AGENT <span className="text-blue-600">이사 KEVIN</span>이 알려드립니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {vipTips.map((tip, index) => (
                  <div key={index} className={`${tip.bgColor} p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border ${tip.borderColor} group`}>
                    <h3 className="text-xl font-black text-gray-900 mb-4">{tip.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{tip.content}</p>
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