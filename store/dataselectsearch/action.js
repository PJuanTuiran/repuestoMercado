export const actionTypes = {
    GET_DATASELECTSEARCH: 'GET_DATASELECTSEARCH',
    GET_DATASELECTSEARCH_SUCCESS: 'GET_DATASELECTSEARCH_SUCCESS',
};

export function getDataSelectSearch(payload) {
    return { type: actionTypes.GET_DATASELECTSEARCH, payload };
}

export function getDataSelectSearchSuccess(payload) {
    return {
        type: actionTypes.GET_DATASELECTSEARCH_SUCCESS,
        payload,
    };
}