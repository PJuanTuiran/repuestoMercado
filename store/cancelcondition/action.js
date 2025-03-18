export const actionTypes = {
    GET_CANCELCONDITION: 'GET_CANCELCONDITION',
    GET_CANCELCONDITION_SUCCESS: 'GET_CANCELCONDITION_SUCCESS',
};

export function getCancelCondition(payload) {
    return { type: actionTypes.GET_CANCELCONDITION, payload };
}

export function getCancelConditionSuccess(payload) {
    return {
        type: actionTypes.GET_CANCELCONDITION_SUCCESS,
        payload,
    };
}