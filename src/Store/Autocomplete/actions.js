export const GET_AUTOCOMPLETE_DT_ACTION = 'GET_AUTOCOMPLETE_DT_ACTION';
export const GET_AUTOCOMPLETE_DT_SUCCESS_ACTION = 'GET_AUTOCOMPLETE_DT_SUCCESS_ACTION';
export const GET_AUTOCOMPLETE_DT_FAILURE_ACTION = 'GET_AUTOCOMPLETE_DT_FAILURE_ACTION';


export const getAutocompleteDtAction = () => {
    return {
        type: GET_AUTOCOMPLETE_DT_ACTION,
    };
}

export const getAutocompleteDtSuccessAction = (data) => {
    return {
        type: GET_AUTOCOMPLETE_DT_SUCCESS_ACTION,
        data,
    };
}

export const getAutocompleteDtFailureAction = () => {
    return {
        type: GET_AUTOCOMPLETE_DT_FAILURE_ACTION,
    };
}