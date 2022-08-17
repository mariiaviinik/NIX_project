export const selectForecastDt = (store) => store.forecast.weatherForecastDt;
export const selectCurrentWeather = (store) => store.forecast.currentWeather;
export const selectCurrentCity = (state) => state.forecast.currentCity;
export const selectIsLoadingForecastList = (state) => state.forecast.isLoadingForecastList;
export const selectIsLoadingCurrent = (state) => state.forecast.isLoadingCurrent;