export const actionTypes = {
    GET_ADDEDTOCART: 'GET_ADDEDTOCART',
    GET_ADDEDTOCART_SUCCESS: 'GET_ADDEDTOCART_SUCCESS',
};

export function getAddEdToCart(payload) {
    return { type: actionTypes.GET_ADDEDTOCART, payload };
}

export function getAddEdToCartSuccess(payload) {
    return {
        type: actionTypes.GET_ADDEDTOCART_SUCCESS,
        payload,
    };
}