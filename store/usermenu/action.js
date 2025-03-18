export const actionTypes = {
    GET_USERMENU: 'GET_USERMENU',
    GET_USERMENU_SUCCESS: 'GET_USERMENU_SUCCESS',
};

export function getUserMenu(payload) {
    return { type: actionTypes.GET_USERMENU, payload };
}

export function getUserMenuSuccess(payload) {
    return {
        type: actionTypes.GET_USERMENU_SUCCESS,
        payload,
    };
}