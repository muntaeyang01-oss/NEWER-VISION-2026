import React from 'react';
import { ViewType, SiteConfig } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  config: SiteConfig;
  view: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, config, view, onViewChange }) => {
  const kakaoLink = config.socialLinks.kakao || "#";

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (view !== ViewType.PUBLIC) {
      onViewChange(ViewType.PUBLIC);
      return;
    }
    
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 96; // Header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-gray-900">
      {/* Header - Removed border and shadow as requested for a cleaner look */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-24 items-center justify-between">
            {/* Left Section: Ultra Premium Logo */}
            <div 
              onClick={() => {
                onViewChange(ViewType.PUBLIC);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center space-x-5 shrink-0 cursor-pointer group h-full"
            >
              <div className="relative">
                {/* 3D Shield Icon Container */}
                <div className="relative w-16 h-16 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                  {/* Outer Glow */}
                  <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Hexagonal/Diamond Shape */}
                  <div className="w-14 h-12 bg-gradient-to-b from-purple-900 via-purple-700 to-purple-900 rounded-lg shadow-2xl flex items-center justify-center border-2 border-yellow-400/50 transform perspective-1000 rotate-y-12 rotate-x-12 group-hover:rotate-0 transition-all duration-700">
                    <div className="flex flex-row items-center justify-center space-x-0.5">
                      <span className="text-white font-black text-2xl italic tracking-tighter drop-shadow-lg">N</span>
                      <span className="text-yellow-400 font-black text-2xl italic tracking-tighter drop-shadow-lg">V</span>
                    </div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white shadow-[0_0_10px_#facc15] animate-pulse"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-400 rounded-full border border-white"></div>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-baseline space-x-1 leading-none">
                  <span className="font-black text-3xl tracking-tighter text-gray-900 uppercase italic">NEWER</span>
                  <span className="font-black text-3xl tracking-tighter text-purple-700 uppercase italic drop-shadow-sm">VISION</span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-[10px] text-gray-400 font-bold tracking-[0.4em] uppercase">Fantastic Clark</span>
                  <div className="h-[2px] flex-grow bg-gradient-to-r from-purple-500 to-transparent rounded-full opacity-40"></div>
                </div>
              </div>
            </div>
            
            {/* Center Section: Navigation Links */}
            <div className="hidden xl:flex flex-grow items-center justify-center h-full px-8">
              <div className="flex items-center h-full space-x-8">
                <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="h-full px-2 flex items-center text-gray-900 hover:text-purple-600 font-black transition-all text-base uppercase hover:bg-gray-50/50">홈</a>
                <a href="#agency" onClick={(e) => handleNavClick(e, 'agency')} className="h-full px-2 flex items-center text-gray-600 hover:text-purple-600 font-black transition-all text-base uppercase hover:bg-gray-50/50">AGENCY</a>
                <a href="#staff" onClick={(e) => handleNavClick(e, 'staff')} className="h-full px-2 flex items-center text-gray-600 hover:text-purple-600 font-black transition-all text-base uppercase hover:bg-gray-50/50">STAFF</a>
                <a href="#service" onClick={(e) => handleNavClick(e, 'service')} className="h-full px-2 flex items-center text-gray-600 hover:text-purple-600 font-black transition-all text-base uppercase hover:bg-gray-50/50">SERVICE</a>
                <a href="#details" onClick={(e) => handleNavClick(e, 'details')} className="h-full px-2 flex items-center text-gray-600 hover:text-purple-600 font-black transition-all text-base uppercase hover:bg-gray-50/50">DETAILS</a>
                <a href="#reservation" onClick={(e) => handleNavClick(e, 'reservation')} className="h-full px-2 flex items-center text-gray-600 hover:text-purple-600 font-black transition-all text-base uppercase hover:bg-gray-50/50">RESERVATION</a>
              </div>
            </div>

            {/* Right Section: Action Buttons */}
            <div className="hidden xl:flex items-center shrink-0 space-x-4">
              <a 
                href={kakaoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-5 py-2.5 bg-[#FEE500] text-[#3c1e1e] rounded-xl text-sm font-black hover:bg-[#ebd200] transition-all shadow-md active:scale-95 whitespace-nowrap border border-yellow-400 group"
              >
                <span className="mr-2 flex items-center justify-center w-5 h-5 bg-[#3c1e1e] rounded-md shadow-inner group-hover:rotate-12 transition-transform">
                  <span className="text-[7px] text-[#FEE500] font-black tracking-tighter leading-none">TALK</span>
                </span>
                빠른환전 문의
              </a>
              
              <a 
                href={kakaoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-5 py-2.5 bg-[#FEE500] text-[#3c1e1e] rounded-xl text-sm font-black hover:bg-[#ebd200] transition-all shadow-md active:scale-95 whitespace-nowrap border border-yellow-400 group"
              >
                <span className="mr-2 flex items-center justify-center w-5 h-5 bg-[#3c1e1e] rounded-md shadow-inner group-hover:rotate-12 transition-transform">
                  <span className="text-[7px] text-[#FEE500] font-black tracking-tighter leading-none">TALK</span>
                </span>
                카톡문의
              </a>
            </div>

            {/* Mobile Menu Icon */}
            <div className="xl:hidden flex items-center">
               <button className="p-2 text-gray-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
               </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer - Removed any divider lines for a seamless look */}
      <footer className="bg-gray-900 text-white py-16 mt-0 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex flex-col items-start mb-6">
                <div className="flex items-baseline space-x-1">
                  <span className="font-black text-2xl tracking-tighter text-white uppercase italic">NEWER</span>
                  <span className="font-black text-2xl tracking-tighter text-purple-500 uppercase italic">VISION</span>
                </div>
                <span className="text-[8px] text-gray-500 font-bold tracking-[0.5em] uppercase mt-1">Fantastic Clark</span>
              </div>
              <p className="text-gray-400 text-base leading-relaxed max-w-md">
                {config.description}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white text-lg">Quick Contact</h4>
              <ul className="text-gray-400 text-sm space-y-4 font-medium">
                <li className="flex items-center hover:text-purple-400 transition-colors">
                  <a href={kakaoLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <span className="w-8 h-8 bg-gray-800 flex items-center justify-center rounded-lg mr-3">💬</span>
                    카카오톡 문의
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white text-lg">Legal Info</h4>
              <p className="text-gray-500 text-xs leading-relaxed italic">
                본 웹사이트는 필리핀 클락 내 합법적인 에이전시 업무를 대행하며, 만 19세 이상의 성인만을 대상으로 서비스를 제공합니다. 게임 과몰입은 당신의 삶을 파괴할 수 있습니다.
              </p>
            </div>
          </div>
          
          {/* Removed border-t and pt-8 to satisfy "remove the line at the very bottom" */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
            <p>© 2026 {config.title}. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-purple-400 transition-colors text-xs font-bold uppercase">이용약관</a>
              <a href="#" className="hover:text-purple-400 transition-colors text-xs font-bold uppercase">개인정보처리방침</a>
            </div>
          </div>
        </div>

        {/* Hidden/Discrete Admin Access */}
        <div 
          onClick={() => onViewChange(view === ViewType.PUBLIC ? ViewType.ADMIN : ViewType.PUBLIC)}
          className="absolute bottom-2 right-2 w-8 h-8 opacity-0 hover:opacity-10 cursor-default"
          title="Admin Access"
        />
      </footer>
    </div>
  );
};

export default Layout;