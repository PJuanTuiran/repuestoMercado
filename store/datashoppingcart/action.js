export const actionTypes = {
    GET_DATASHOPPINGCART: 'GET_DATASHOPPINGCART',
    GET_DATASHOPPINGCART_SUCCESS: 'GET_DATASHOPPINGCART_SUCCESS',
};

export function getDataShoppingCart(payload) {
    return { type: actionTypes.GET_DATASHOPPINGCART, payload };
}

export function getDataShoppingCartSuccess(payload) {
    return {
        type: actionTypes.GET_DATASHOPPINGCART_SUCCESS,
        payload,
    };
}