import { ui, defaultLang, type Locale, type TranslationKey } from './ui';

/**
 * Get translation for a given key and locale
 */
export function useTranslations(lang: Locale) {
  return function t(key: TranslationKey): string {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

/**
 * Get the locale from a URL path
 */
export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Locale;
  return defaultLang;
}

/**
 * Get localized path for a given path and locale
 */
export function getLocalizedPath(path: string, locale: Locale): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // If default locale and prefixDefaultLocale is false, don't add prefix
  if (locale === defaultLang) {
    return `/${cleanPath}`;
  }
  
  return `/${locale}/${cleanPath}`;
}

/**
 * Remove locale prefix from path
 */
export function removeLocalePath(path: string): string {
  const segments = path.split('/').filter(Boolean);
  if (segments.length > 0 && segments[0] in ui) {
    return '/' + segments.slice(1).join('/');
  }
  return path;
}
