export const SET_USER_DT_ACTION = 'SET_USER_DT_ACTION';


export const ADD_FAVOURITE_CITY_ACTION = 'ADD_FAVOURITE_CITY_ACTION';
export const DELETE_FAVOURITE_CITY_ACTION = 'DELETE_FAVOURITE_CITY_ACTION';

export const ADD_SPORT_EVENT_ACTION = 'ADD_SPORT_EVENT_ACTION';
export const DELETE_SPORT_EVENT_ACTION = 'DELETE_SPORT_EVENT_ACTION';

export const CHANGE_LOG_STATUS_ACTION = 'CHANGE_LOG_STATUS_ACTION';
export const CHANGE_THEME_ACTION = 'CHANGE_THEME_ACTION';
export const CHANGE_LANGUAGE_ACTION = 'CHANGE_LANGUAGE_ACTION';
export const CHANGE_SYSTEM_ACTION = 'CHANGE_SYSTEM_ACTION';


export const setUserDtAction = (data) => {
    return {
        type: SET_USER_DT_ACTION,
        data
    };
}

export const addFavouriteCityAction = (city) => {
    return {
        type: ADD_FAVOURITE_CITY_ACTION,
        city
    };
}

export const deleteFavouriteCityAction = (index) => {
    return {
        type: DELETE_FAVOURITE_CITY_ACTION,
        index
    };
}

export const addSportEventAction = (sportEvent) => {
    return {
        type: ADD_SPORT_EVENT_ACTION,
        sportEvent
    };
}

export const deleteSportEventAction = (index) => {
    return {
        type: DELETE_SPORT_EVENT_ACTION,
        index
    };
}

export const changeLogStatusAction = (status) => {
    return {
        type: CHANGE_LOG_STATUS_ACTION,
        status
    };
}
export const changeThemeAction = (theme) => {
    return {
        type: CHANGE_THEME_ACTION,
        theme
    };
}

export const changeLanguageAction = (lang) => {
    return {
        type: CHANGE_LANGUAGE_ACTION,
        lang
    };
}

export const changeSystemAction = (option) => {
    return {
        type: CHANGE_SYSTEM_ACTION,
        option
    };
}