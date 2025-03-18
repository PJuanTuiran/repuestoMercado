export const actionTypes = {
    GET_CHANGESEARCH: 'GET_CHANGESEARCH',
    GET_CHANGESEARCH_SUCCESS: 'GET_CHANGESEARCH_SUCCESS',
};

export function getChangeSearch(payload) {
    return { type: actionTypes.GET_CHANGESEARCH, payload };
}

export function getChangeSearchSuccess(payload) {
    return {
        type: actionTypes.GET_CHANGESEARCH_SUCCESS,
        payload,
    };
}