export const actionTypes = {
    GET_LONGPAGE: 'GET_LONGPAGE',
    GET_LONGPAGE_SUCCESS: 'GET_LONGPAGE_SUCCESS',
};

export function getLongPage(payload) {
    return { type: actionTypes.GET_LONGPAGE, payload };
}

export function getLongPageSuccess(payload) {
    return {
        type: actionTypes.GET_LONGPAGE_SUCCESS,
        payload,
    };
}