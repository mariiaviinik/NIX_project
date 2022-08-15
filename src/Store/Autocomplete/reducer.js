import { 
    GET_AUTOCOMPLETE_DT_ACTION,
    GET_AUTOCOMPLETE_DT_SUCCESS_ACTION,
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
        default: return state;
    }
}