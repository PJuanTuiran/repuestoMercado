export const actionTypes = {
    GET_VARIABLESGENERALESMRP: 'GET_VARIABLESGENERALESMRP',
    GET_VARIABLESGENERALESMRP_SUCCESS: 'GET_VARIABLESGENERALESMRP_SUCCESS',
};

export function getVariablesGeneralesMrp(payload) {
    return { type: actionTypes.GET_VARIABLESGENERALESMRP, payload };
}

export function getVariablesGeneralesMrpSuccess(payload) {
    return {
        type: actionTypes.GET_VARIABLESGENERALESMRP_SUCCESS,
        payload,
    };
}