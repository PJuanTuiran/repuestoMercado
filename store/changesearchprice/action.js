export const actionTypes = {
    GET_CHANGESEARCHPRICE: 'GET_CHANGESEARCHPRICE',
    GET_CHANGESEARCHPRICE_SUCCESS: 'GET_CHANGESEARCHPRICE_SUCCESS',
};

export function getChangeSearchPrice(payload) {
    return { type: actionTypes.GET_CHANGESEARCHPRICE, payload };
}

export function getChangeSearchPriceSuccess(payload) {
    return {
        type: actionTypes.GET_CHANGESEARCHPRICE_SUCCESS,
        payload,
    };
}