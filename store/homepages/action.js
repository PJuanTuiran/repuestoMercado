export const actionTypes = {
    GET_HOMEPAGES: 'GET_HOMEPAGES',
    GET_HOMEPAGES_SUCCESS: 'GET_HOMEPAGES_SUCCESS',
};

export function getHomePages(payload) {
    //console.log("GET HOME PAGES : ", payload)
    return { type: actionTypes.GET_HOMEPAGES, payload };
}

export function getHomePagesSuccess(payload) {
    return {
        type: actionTypes.GET_HOMEPAGES_SUCCESS,
        payload,
    };
}