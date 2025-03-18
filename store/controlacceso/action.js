export const actionTypes = {
    GET_CONTROLACCESO: 'GET_CONTROLACCESO',
    GET_CONTROLACCESO_SUCCESS: 'GET_CONTROLACCESO_SUCCESS',
};

export function getControlAcceso(payload) {
    return { type: actionTypes.GET_CONTROLACCESO, payload };
}

export function getControlAccesoSuccess(payload) {
    return {
        type: actionTypes.GET_CONTROLACCESO_SUCCESS,
        payload,
    };
}