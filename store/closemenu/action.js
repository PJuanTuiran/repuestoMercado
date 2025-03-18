export const actionTypes = {
    GET_CLOSEMENU: 'GET_CLOSEMENU',
    GET_CLOSEMENU_SUCCESS: 'GET_CLOSEMENU_SUCCESS',
};

export function getCloseMenu(payload) {
    return { type: actionTypes.GET_CLOSEMENU, payload };
}

export function getCloseMenuSuccess(payload) {
    return {
        type: actionTypes.GET_CLOSEMENU_SUCCESS,
        payload,
    };
}