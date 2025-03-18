export const actionTypes = {
    GET_RANGOSPRECIO: 'GET_RANGOSPRECIO',
    GET_RANGOSPRECIO_SUCCESS: 'GET_RANGOSPRECIO_SUCCESS',
};

export function getRangosPrecio(payload) {
    return { type: actionTypes.GET_RANGOSPRECIO, payload };
}

export function getRangosPrecioSuccess(payload) {
    return {
        type: actionTypes.GET_RANGOSPRECIO_SUCCESS,
        payload,
    };
}