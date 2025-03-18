export const actionTypes = {
    GET_DATOSPRODUCTOUNO: 'GET_DATOSPRODUCTOUNO',
    GET_DATOSPRODUCTOUNO_SUCCESS: 'GET_DATOSPRODUCTOUNO_SUCCESS',
};

export function getDatosProductoUno(payload) {
    return { type: actionTypes.GET_DATOSPRODUCTOUNO, payload };
}

export function getDatosProductoUnoSuccess(payload) {
    return {
        type: actionTypes.GET_DATOSPRODUCTOUNO_SUCCESS,
        payload,
    };
}