import { getLocales } from 'expo-localization';

import {
    registerTranslation,
    ar,
    ca,
    de,
    en,
    es,
    fr,
    he,
    hi,
    it,
    ko,
    nl,
    pl,
    pt,
    tr,
    zh,
    cs,
    el,
    ru,
    ro,
    id,
    ja,
    th,
    ukUA,
    noNO,
    sv,
} from 'react-native-paper-dates';

const localesMap: Record<string, any> = {
    ar,
    ca,
    de,
    en,
    es,
    fr,
    he,
    hi,
    it,
    ko,
    nl,
    pl,
    pt,
    tr,
    zh,
    cs,
    el,
    ru,
    ro,
    id,
    ja,
    th,
    uk: ukUA,
    no: noNO,
    sv,
};

Object.entries(localesMap).forEach(([key, value]) => {
    registerTranslation(key, value);
});

export function useLocale(): string {
    const locales = getLocales();
    const firstLocale = locales[0].languageCode || 'en';

    return localesMap[firstLocale] ? firstLocale : 'en';
}
