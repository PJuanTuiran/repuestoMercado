export const actionTypes = {
    GET_UBICARPRODUCTO: 'GET_UBICARPRODUCTO',
    GET_UBICARPRODUCTO_SUCCESS: 'GET_UBICARPRODUCTO_SUCCESS',
};

export function getUbicarProducto(payload) {
    return { type: actionTypes.GET_UBICARPRODUCTO, payload };
}

export function getUbicarProductoSuccess(payload) {
    return {
        type: actionTypes.GET_UBICARPRODUCTO_SUCCESS,
        payload,
    };
}