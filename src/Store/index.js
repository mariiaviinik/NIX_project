import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { autocompleteReducer } from './Autocomplete/reducer';
import { forecastReducer } from './Forecast/reducer';
import { historyReducer } from './History/reducer';
import { sportReducer } from './Sport/reducer';
import { userReducer } from './User/reducer';


const persistConfig = {
    key: 'user',
    storage,
    whitelist: ['user'],
}

const rootReducer = combineReducers({
    autocompleteDt: autocompleteReducer,
    forecast: forecastReducer,
    history: historyReducer,
    sport: sportReducer,
    user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
