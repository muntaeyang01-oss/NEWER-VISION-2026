
export enum ViewType {
  PUBLIC = 'PUBLIC',
  ADMIN = 'ADMIN'
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  date: string;
  category: string;
}

export interface SiteConfig {
  title: string;
  description: string;
  primaryColor: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    kakao?: string;
    telegram?: string;
  };
  seo: {
    keywords: string;
    author: string;
  };
}

export interface AppState {
  view: ViewType;
  config: SiteConfig;
  posts: Post[];
}
