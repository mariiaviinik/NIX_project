import { translation } from '../../translation';

export const selectUserContacts = (store) => store.user.contacts;
export const selectFavCities = (store) => store.user.settings.cities;
export const selectSavedSportEvents = (store) => store.user.settings.savedSportEvents;
export const selectTheme = (store) => store.user.settings.theme;
export const selectSystem = (store) => store.user.settings.system;
export const selectLang = (store) => translation[store.user.settings.lang];
export const selectLangName = (store) => store.user.settings.lang;
