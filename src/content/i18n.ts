import en from './en.json';
import ru from './ru.json';
import uz from './uz.json';

export const LOCALES = ['en', 'ru', 'uz'] as const;
export type Lang = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Lang = 'en';

export type Dict = typeof en;
export type MenuCategory = Dict['menu']['cats'][number];
export type Dish = MenuCategory['items'][number];

export const DICTS: Record<Lang, Dict> = { en, ru: ru as Dict, uz: uz as Dict };

export function isLang(v: unknown): v is Lang {
  return typeof v === 'string' && (LOCALES as readonly string[]).includes(v);
}

export function getDict(lang: Lang): Dict {
  return DICTS[lang] ?? DICTS.en;
}

/** BCP-47 tag for <html lang> and hreflang. Uzbek content is written in Latin script. */
export const HTML_LANG: Record<Lang, string> = { en: 'en', ru: 'ru', uz: 'uz-Latn' };
export const OG_LOCALE: Record<Lang, string> = { en: 'en_US', ru: 'ru_RU', uz: 'uz_UZ' };
export const DATE_LOCALE: Record<Lang, string> = { en: 'en-GB', ru: 'ru-RU', uz: 'uz-Latn-UZ' };
export const CURRENCY: Record<Lang, string> = { en: 'UZS', ru: 'сум', uz: 'soʻm' };
