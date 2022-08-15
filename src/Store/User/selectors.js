export const selectUserContacts = (store) => store.user.contacts;
export const selectFavCities = (store) => store.user.settings.cities;
export const selectSavedSportEvents = (store) => store.user.settings.savedSportEvents;
export const selectTheme = (store) => store.user.settings.theme;
export const selectLang = (store) => store.user.settings.lang;
