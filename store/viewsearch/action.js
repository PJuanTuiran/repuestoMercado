export const actionTypes = {
    GET_VIEWSEARCH: 'GET_VIEWSEARCH',
    GET_VIEWSEARCH_SUCCESS: 'GET_VIEWSEARCH_SUCCESS',
};

export function getViewSearch(payload) {
    return { type: actionTypes.GET_VIEWSEARCH, payload };
}

export function getViewSearchSuccess(payload) {
    return {
        type: actionTypes.GET_VIEWSEARCH_SUCCESS,
        payload,
    };
}