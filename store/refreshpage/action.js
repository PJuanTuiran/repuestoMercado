export const actionTypes = {
    GET_REFRESHPAGE: 'GET_REFRESHPAGE',
    GET_REFRESHPAGE_SUCCESS: 'GET_REFRESHPAGE_SUCCESS',
};

export function getRefreshPage(payload) {
    return { type: actionTypes.GET_REFRESHPAGE, payload };
}

export function getRefreshPageSuccess(payload) {
    return {
        type: actionTypes.GET_REFRESHPAGE_SUCCESS,
        payload,
    };
}