export const actionTypes = {
    GET_BLOCKSCREEN: 'GET_BLOCKSCREEN',
    GET_BLOCKSCREEN_SUCCESS: 'GET_BLOCKSCREEN_SUCCESS',
};

export function getBlockScreen(payload) {
    return { type: actionTypes.GET_BLOCKSCREEN, payload };
}

export function getBlockScreenSuccess(payload) {
    return {
        type: actionTypes.GET_BLOCKSCREEN_SUCCESS,
        payload,
    };
}