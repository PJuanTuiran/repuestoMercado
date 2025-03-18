export const actionTypes = {
    GET_CTLRNOTIFICACION: 'GET_CTLRNOTIFICACION',
    GET_CTLRNOTIFICACION_SUCCESS: 'GET_CTLRNOTIFICACION_SUCCESS',
};

export function getCtlrNotificacion(payload) {
    return { type: actionTypes.GET_CTLRNOTIFICACION, payload };
}

export function getCtlrNotificacionSuccess(payload) {
    return {
        type: actionTypes.GET_CTLRNOTIFICACION_SUCCESS,
        payload,
    };
}