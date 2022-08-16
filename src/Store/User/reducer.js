import { 
    SET_USER_DT_ACTION,
    ADD_FAVOURITE_CITY_ACTION,
    DELETE_FAVOURITE_CITY_ACTION,
    ADD_SPORT_EVENT_ACTION,
    DELETE_SPORT_EVENT_ACTION,
    CHANGE_LOG_STATUS_ACTION,
    CHANGE_THEME_ACTION,
    CHANGE_LANGUAGE_ACTION,
    CHANGE_SYSTEM_ACTION,
} from './actions';

const initialState = {
    contacts: {},
    settings: {
        cities: [],
        savedSportEvents: [[], [], []],
        theme: 'light',
        lang: 'en',
    }
}

export const userReducer = (state=initialState, action) => {
    switch(action.type){
        case SET_USER_DT_ACTION:
            return {...state, contacts: action.data}
        case ADD_FAVOURITE_CITY_ACTION:
            return { ...state, settings: {...state.settings, cities: [...state.settings.cities, action.city ]}}
        case DELETE_FAVOURITE_CITY_ACTION:
            return { ...state, settings: 
                {...state.settings,
                 cities: state.settings.cities.filter((city, index) => action.index !== index)
                }
            }
        case ADD_SPORT_EVENT_ACTION:
            state.settings.savedSportEvents[action.index] = [...state.settings.savedSportEvents[action.index], action.sportEvent]
            return { ...state, settings: 
                {...state.settings, 
                    savedSportEvents:  [...state.settings.savedSportEvents]
                }
            }
        case DELETE_SPORT_EVENT_ACTION:
            state.settings.savedSportEvents[action.typeIndex] = state.settings.savedSportEvents[action.typeIndex].filter((sport, index) => action.eventIndex !== index)
            return { ...state, settings: 
                {...state.settings,
                    savedSportEvents: [...state.settings.savedSportEvents]
                }
            }
        case CHANGE_LOG_STATUS_ACTION:
            return { ...state, contacts: 
                {...state.contacts,
                    login: action.status,
                }
            }
        case CHANGE_THEME_ACTION:
            return { ...state, settings: 
                {...state.settings,
                    theme: action.theme
                }
            }
        case CHANGE_LANGUAGE_ACTION:
            return { ...state, settings: 
                {...state.settings,
                    lang: action.lang
                }
            }
        case CHANGE_SYSTEM_ACTION:
            return { ...state, settings: 
                {...state.settings,
                    system: action.option
                }
            }
        default: return state;
    }
}