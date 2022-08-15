import { 
    GET_SPORT_EVENTS_ACTION,
    GET_SPORT_EVENTS_SUCCESS_ACTION,
    GET_SPORT_EVENTS_FAILURE_ACTION,
} from './actions';

const initialState = {
    sportEventsDT: [],
}

export const sportReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_SPORT_EVENTS_ACTION:
            return{...state}
        case GET_SPORT_EVENTS_SUCCESS_ACTION:
            return{...state,
                sportEventsDT: [action.data.football, action.data.cricket, action.data.golf],
            }
        default: return state;
    }
}