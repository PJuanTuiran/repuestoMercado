export const actionTypes = {
    GET_SELECTVIEWPRODUCT: 'GET_SELECTVIEWPRODUCT',
    GET_SELECTVIEWPRODUCT_SUCCESS: 'GET_SELECTVIEWPRODUCT_SUCCESS',
};

export function getSelectViewProduct(payload) {
    return { type: actionTypes.GET_SELECTVIEWPRODUCT, payload };
}

export function getSelectViewProductSuccess(payload) {
    return {
        type: actionTypes.GET_SELECTVIEWPRODUCT_SUCCESS,
        payload,
    };
}