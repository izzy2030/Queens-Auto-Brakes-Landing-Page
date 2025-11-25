export type LangType = 'en' | 'es';

export interface TranslationData {
  [key: string]: string;
}

export interface Translations {
  en: TranslationData;
  es: TranslationData;
}

export interface Review {
  name: string;
  text: string;
}

export interface WebhookData {
  name: string;
  symptom: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  carMake: string;
  carModel: string;
  carYear: string;
  date: string;
  time: string;
  userLanguage: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
  fbclid: string;
  msclkid: string;
  pageVariant: string;
}
