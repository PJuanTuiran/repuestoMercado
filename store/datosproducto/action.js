export const actionTypes = {
    GET_DATOSPRODUCTO: 'GET_DATOSPRODUCTO',
    GET_DATOSPRODUCTO_SUCCESS: 'GET_DATOSPRODUCTO_SUCCESS',
};

export function getDatosProducto(payload) {
    return { type: actionTypes.GET_DATOSPRODUCTO, payload };
}

export function getDatosProductoSuccess(payload) {
    return {
        type: actionTypes.GET_DATOSPRODUCTO_SUCCESS,
        payload,
    };
}