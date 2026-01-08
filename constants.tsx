import { Post, SiteConfig } from './types';

export const INITIAL_CONFIG: SiteConfig = {
  title: "NEWER VISION",
  description: "VIP이용 고객님은 경험이 많은 에이전트와 함께 하셔야합니다.",
  primaryColor: "#9333ea", // Purple-600
  socialLinks: {
    kakao: "http://pf.kakao.com/_aRlxon/chat",
    instagram: "newer_vision_clark"
  },
  seo: {
    keywords: "클락 카지노, 필리핀 카지노, 에이전시, 클락 골프, VIP 의전",
    author: "NEWER VISION Team"
  }
};

export const INITIAL_POSTS: Post[] = [
  {
    id: "1",
    title: "클락 여행정보",
    excerpt: "클락 여행을 계획하시는 모든 분들께 다양한 정보를 드립니다.",
    content: "클락 여행의 시작과 끝, NEWER VISION이 함께합니다. 항공권 예약부터 현지 최고급 호텔인 로이스, 한 카지노 이용 팁까지 상세히 안내해 드립니다.",
    imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800",
    date: "2024-05-10",
    category: "카지노 정보"
  },
  {
    id: "2",
    title: "클락 밤문화",
    excerpt: "필리핀을 대표하는 클락의 밤 문화를 좀 더 디테일하게 알아봅시다.",
    content: "화려한 네온사인과 활기찬 에너지가 넘치는 클락의 밤. 안전하고 즐거운 유흥 문화를 경험하실 수 있도록 검증된 장소만을 추천해 드립니다.",
    imageUrl: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80&w=800",
    date: "2024-05-12",
    category: "골프 투어"
  },
  {
    id: "3",
    title: "클락 맛집투어",
    excerpt: "클락의 맛집은 이곳에서 끝냅시다.",
    content: "현지인들만 아는 숨은 맛집부터 최고급 파인 다이닝까지, 클락에서만 맛볼 수 있는 특별한 미식의 세계로 여러분을 초대합니다.",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
    date: "2024-05-15",
    category: "공지사항"
  }
];