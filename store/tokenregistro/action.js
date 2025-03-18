export const actionTypes = {
    GET_TOKENREGISTRO: 'GET_TOKENREGISTRO',
    GET_TOKENREGISTRO_SUCCESS: 'GET_TOKENREGISTRO_SUCCESS',
};

export function getTokenRegistro(payload) {
    return { type: actionTypes.GET_TOKENREGISTRO, payload };
}

export function getTokenRegistroSuccess(payload) {
    return {
        type: actionTypes.GET_TOKENREGISTRO_SUCCESS,
        payload,
    };
}