export const actionTypes = {
    GET_DATASELECTEDEXTERNAL: 'GET_DATASELECTEDEXTERNAL',
    GET_DATASELECTEDEXTERNAL_SUCCESS: 'GET_DATASELECTEDEXTERNAL_SUCCESS',
};

export function getDataSelectedExternal(payload) {
    return { type: actionTypes.GET_DATASELECTEDEXTERNAL, payload };
}

export function getDataSelectedExternalSuccess(payload) {
    return {
        type: actionTypes.GET_DATASELECTEDEXTERNAL_SUCCESS,
        payload,
    };
}