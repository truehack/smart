import * as Localization from 'expo-localization';
import { useMemo } from 'react';
import {
    ru,
    fr,
    es,
    de,
    it,
    pl,
    pt,
    nl,
    ja,
    ko,
    zh,
    registerTranslation,
    en,
} from 'react-native-paper-dates';

const translations: Record<string, any> = {
    en,
    ru,
    fr,
    es,
    de,
    it,
    pl,
    pt,
    nl,
    ja,
    ko,
    zh,
};

export function useLocale() {
    const localeObj = Localization.getLocales()[0];
    const tag = localeObj.languageTag;
    const baseLang = tag.split('-')[0];

    const selectedLocale =
        translations[tag] || translations[baseLang] || translations['ru'];

    useMemo(() => {
        registerTranslation(tag, selectedLocale);
    }, [tag, selectedLocale]);

    return tag;
}
