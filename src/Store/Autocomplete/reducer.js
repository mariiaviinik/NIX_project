import { 
    GET_AUTOCOMPLETE_DT_ACTION,
    GET_AUTOCOMPLETE_DT_SUCCESS_ACTION,
    GET_AUTOCOMPLETE_DT_FAILURE_ACTION,
} from './actions';

const initialState = {
    autocompleteDt: [],
}

export const autocompleteReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_AUTOCOMPLETE_DT_ACTION:
            return{...state}
        case GET_AUTOCOMPLETE_DT_SUCCESS_ACTION:
            return{...state,
                autocompleteDt: action.data,
            }
        case GET_AUTOCOMPLETE_DT_FAILURE_ACTION:
            return{...state,
                error: action.error,
            }
        default: return state;
    }
}