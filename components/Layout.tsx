import React, { useState } from 'react';
import { ViewType, SiteConfig } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  config: SiteConfig;
  view: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, config, view, onViewChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    // Close mobile menu first if open
    setIsMobileMenuOpen(false);

    if (view !== ViewType.PUBLIC) {
      onViewChange(ViewType.PUBLIC);
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

  const navLinks = [
    { id: 'home', label: '홈' },
    { id: 'agency', label: 'AGENCY' },
    { id: 'staff', label: 'STAFF' },
    { id: 'service', label: 'SERVICE' },
    { id: 'viptip', label: 'VIP TIP' },
    { id: 'details', label: 'DETAILS' },
    { id: 'reservation', label: 'RESERVATION' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-gray-900 overflow-x-hidden">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-24 items-center justify-between">
            {/* Left Section: Logo */}
            <div 
              onClick={() => {
                onViewChange(ViewType.PUBLIC);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center space-x-4 shrink-0 cursor-pointer group"
            >
              <div className="relative w-12 h-12 flex items-center justify-center transform group-hover:scale-105 transition-all">
                <div className="w-10 h-10 bg-gradient-to-b from-purple-900 via-purple-700 to-purple-900 rounded-lg shadow-xl flex items-center justify-center border-2 border-yellow-400/30">
                  <div className="flex flex-row items-center justify-center -space-x-0.5">
                    <span className="text-white font-black text-lg italic tracking-tighter">N</span>
                    <span className="text-yellow-400 font-black text-lg italic tracking-tighter">V</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-baseline space-x-1 leading-none">
                  <span className="font-black text-xl md:text-2xl tracking-tighter text-gray-900 uppercase italic">NEWER</span>
                  <span className="font-black text-xl md:text-2xl tracking-tighter text-purple-700 uppercase italic">VISION</span>
                </div>
                <div className="flex items-center space-x-2 mt-0.5">
                  <span className="text-[7px] md:text-[9px] text-gray-400 font-bold tracking-[0.4em] uppercase">Fantastic Clark</span>
                </div>
              </div>
            </div>
            
            {/* Center Section: Desktop Navigation */}
            <div className="hidden xl:flex flex-grow items-center justify-end space-x-8 px-4">
              {navLinks.map(link => (
                <a 
                  key={link.id}
                  href={`#${link.id}`} 
                  onClick={(e) => handleNavClick(e, link.id)} 
                  className="text-gray-600 hover:text-purple-600 font-black transition-all text-sm uppercase tracking-wider"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="xl:hidden flex items-center">
               <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-600 focus:outline-none"
                aria-label="Menu"
               >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8h16M4 16h16"></path>
                  </svg>
               </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Mobile Sidebar */}
        <div 
          className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out xl:hidden ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-50">
              <span className="font-black text-gray-900 italic">MENU</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <nav className="flex-grow py-8 px-6 space-y-5">
              {navLinks.map(link => (
                <a 
                  key={link.id}
                  href={`#${link.id}`} 
                  onClick={(e) => handleNavClick(e, link.id)} 
                  className="block text-xl font-black text-gray-800 hover:text-purple-600 transition-colors uppercase tracking-tight"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            
            <div className="p-6 pb-12">
               <p className="text-center text-[10px] text-gray-400 font-medium">
                © 2026 NEWER VISION CLARK
              </p>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 mt-0 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 text-center md:text-left">
            <div className="col-span-1 md:col-span-2">
              <div className="flex flex-col items-center md:items-start mb-6">
                <div className="flex items-baseline space-x-1">
                  <span className="font-black text-2xl tracking-tighter text-white uppercase italic">NEWER</span>
                  <span className="font-black text-2xl tracking-tighter text-purple-500 uppercase italic">VISION</span>
                </div>
                <span className="text-[8px] text-gray-500 font-bold tracking-[0.5em] uppercase mt-1">Fantastic Clark</span>
              </div>
              <p className="text-gray-400 text-base leading-relaxed max-w-md mx-auto md:mx-0">
                {config.description}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white text-lg">Quick Contact</h4>
              <ul className="text-gray-400 text-sm space-y-4 font-medium flex flex-col items-center md:items-start">
                <li className="flex items-center hover:text-purple-400 transition-colors">
                  <a href={config.socialLinks.kakao || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <span className="w-8 h-8 bg-gray-800 flex items-center justify-center rounded-lg mr-3 text-lg">💬</span>
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
          
          <div className="mt-12 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm border-t border-gray-800/50 pt-8">
            <p>© 2026 {config.title}. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-purple-400 transition-colors text-xs font-bold uppercase tracking-widest">이용약관</a>
              <a href="#" className="hover:text-purple-400 transition-colors text-xs font-bold uppercase tracking-widest">개인정보처리방침</a>
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