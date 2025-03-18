export const actionTypes = {
    GET_SELECTCONDITION: 'GET_SELECTCONDITION',
    GET_SELECTCONDITION_SUCCESS: 'GET_SELECTCONDITION_SUCCESS',
};

export function getSelectCondition(payload) {
    return { type: actionTypes.GET_SELECTCONDITION, payload };
}

export function getSelectConditionSuccess(payload) {
    return {
        type: actionTypes.GET_SELECTCONDITION_SUCCESS,
        payload,
    };
}