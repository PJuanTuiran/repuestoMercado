export const actionTypes = {
    GET_CLEARCONDITION: 'GET_CLEARCONDITION',
    GET_CLEARCONDITION_SUCCESS: 'GET_CLEARCONDITION_SUCCESS',
};

export function getClearCondition(payload) {
    return { type: actionTypes.GET_CLEARCONDITION, payload };
}

export function getClearConditionSuccess(payload) {
    return {
        type: actionTypes.GET_CLEARCONDITION_SUCCESS,
        payload,
    };
}