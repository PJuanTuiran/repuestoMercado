export const actionTypes = {
    GET_USERMENUPRIMARY: 'GET_USERMENUPRIMARY',
    GET_USERMENUPRIMARY_SUCCESS: 'GET_USERMENUPRIMARY_SUCCESS',
};

export function getUserMenuPrimary(payload) {
    return { type: actionTypes.GET_USERMENUPRIMARY, payload };
}

export function getUserMenuPrimarySuccess(payload) {
    return {
        type: actionTypes.GET_USERMENUPRIMARY_SUCCESS,
        payload,
    };
}