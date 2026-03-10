import { ui, defaultLang, type Lang } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return (ui[lang] as any)[key] || ui[defaultLang][key] || key;
  };
}

export function getAlternateLang(lang: Lang): Lang {
  return lang === 'en' ? 'zh' : 'en';
}

export function getLocalizedPath(path: string, lang: Lang): string {
  // Replace /en/ or /zh/ prefix with target lang
  return path.replace(/^\/(en|zh)\//, `/${lang}/`);
}
