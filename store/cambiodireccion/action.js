export const actionTypes = {
    GET_CAMBIODIRECCION: 'GET_CAMBIODIRECCION',
    GET_CAMBIODIRECCION_SUCCESS: 'GET_CAMBIODIRECCION_SUCCESS',
};

export function getCambioDireccion(payload) {
    return { type: actionTypes.GET_CAMBIODIRECCION, payload };
}

export function getCambioDireccionSuccess(payload) {
    return {
        type: actionTypes.GET_CAMBIODIRECCION_SUCCESS,
        payload,
    };
}