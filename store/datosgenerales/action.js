export const actionTypes = {
    GET_DATOSGENERALES: 'GET_DATOSGENERALES',
    GET_DATOSGENERALES_SUCCESS: 'GET_DATOSGENERALES_SUCCESS',
};

export function getDatosGenerales(payload) {
    return { type: actionTypes.GET_DATOSGENERALES, payload };
}

export function getDatosGeneralesSuccess(payload) {
    return {
        type: actionTypes.GET_DATOSGENERALES_SUCCESS,
        payload,
    };
}