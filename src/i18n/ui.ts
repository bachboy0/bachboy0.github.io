// UI translation strings for each locale
export const languages = {
  en: 'English',
  ja: '日本語',
  ko: '한국어',
} as const;

export const defaultLang = 'en';

export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.osaka': 'Osaka Info',
    'site.title': 'Kang Daewook',
    'site.description': 'Welcome to my website!',
    'hero.greeting': "Hi, I'm",
    'hero.tagline': 'Crafting innovative solutions at the intersection of',
    'hero.code': 'Code',
    'hero.design': 'Design',
    'hero.innovation': 'Innovation',
    'hero.github': 'GitHub',
    'hero.linkedin': 'LinkedIn',
    'hero.scroll': 'Scroll to explore',
  },
  ja: {
    'nav.home': 'ホーム',
    'nav.blog': 'ブログ',
    'nav.about': 'について',
    'nav.osaka': '大阪情報',
    'site.title': 'カン・デウク',
    'site.description': '私のウェブサイトへようこそ！',
    'hero.greeting': 'こんにちは、',
    'hero.tagline': '革新的なソリューションを創造しています',
    'hero.code': 'コード',
    'hero.design': 'デザイン',
    'hero.innovation': 'イノベーション',
    'hero.github': 'GitHub',
    'hero.linkedin': 'LinkedIn',
    'hero.scroll': 'スクロールして探索',
  },
  ko: {
    'nav.home': '홈',
    'nav.blog': '블로그',
    'nav.about': '소개',
    'nav.osaka': '오사카 정보',
    'site.title': '강대욱',
    'site.description': '제 웹사이트에 오신 것을 환영합니다!',
    'hero.greeting': '안녕하세요, 저는',
    'hero.tagline': '혁신적인 솔루션을 만들고 있습니다',
    'hero.code': '코드',
    'hero.design': '디자인',
    'hero.innovation': '혁신',
    'hero.github': 'GitHub',
    'hero.linkedin': 'LinkedIn',
    'hero.scroll': '스크롤하여 탐색',
  },
} as const;

export type Locale = keyof typeof languages;
export type TranslationKey = keyof typeof ui[typeof defaultLang];
