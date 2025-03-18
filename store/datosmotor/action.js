export const actionTypes = {
    GET_DATOSMOTOR: 'GET_DATOSMOTOR',
    GET_DATOSMOTOR_SUCCESS: 'GET_DATOSMOTOR_SUCCESS',
};

export function getDatosMotor(payload) {
    return { type: actionTypes.GET_DATOSMOTOR, payload };
}

export function getDatosMotorSuccess(payload) {
    return {
        type: actionTypes.GET_DATOSMOTOR_SUCCESS,
        payload,
    };
}