import * as Localization from 'expo-localization';
import { useMemo } from 'react';
import {
    enGB,
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
    zhTW,
    registerTranslation,
} from 'react-native-paper-dates';

const translations: Record<string, any> = {
    'en-GB': enGB,
    en: enGB,
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
    'zh-TW': zhTW,
};

export function useDatePickerLocale() {
    const localeObj = Localization.getLocales()[0];
    const tag = localeObj.languageTag;
    const baseLang = tag.split('-')[0];

    const selectedLocale =
        translations[tag] || translations[baseLang] || translations['en-GB'];

    useMemo(() => {
        registerTranslation(tag, selectedLocale);
    }, [tag, selectedLocale]);

    return tag;
}
