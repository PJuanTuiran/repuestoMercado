export const actionTypes = {
    GET_DATAWISHLIST: 'GET_DATAWISHLIST',
    GET_DATAWISHLIST_SUCCESS: 'GET_DATAWISHLIST_SUCCESS',
};

export function getDataWishList(payload) {
    return { type: actionTypes.GET_DATAWISHLIST, payload };
}

export function getDataWishListSuccess(payload) {
    return {
        type: actionTypes.GET_DATAWISHLIST_SUCCESS,
        payload,
    };
}