export const GET_SPORT_EVENTS_ACTION = 'GET_SPORT_EVENTS_ACTION';
export const GET_SPORT_EVENTS_SUCCESS_ACTION = 'GET_SPORT_EVENTS_SUCCESS_ACTION';
export const GET_SPORT_EVENTS_FAILURE_ACTION = 'GET_SPORT_EVENTS_FAILURE_ACTION';

export const getSportEventsAction = () => {
    return {
        type: GET_SPORT_EVENTS_ACTION,
    };
}

export const getSportEventsSuccessAction = (data) => {
    return {
        type: GET_SPORT_EVENTS_SUCCESS_ACTION,
        data,
    };
}

export const getSportEventsFailureAction = (error) => {
    return {
        type: GET_SPORT_EVENTS_FAILURE_ACTION,
        error
    };
}