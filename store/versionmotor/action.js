export const actionTypes = {
    GET_VERSIONMOTOR: 'GET_VERSIONMOTOR',
    GET_VERSIONMOTOR_SUCCESS: 'GET_VERSIONMOTOR_SUCCESS',
};

export function getVersionMotor(payload) {
    return { type: actionTypes.GET_VERSIONMOTOR, payload };
}

export function getVersionMotorSuccess(payload) {
    return {
        type: actionTypes.GET_VERSIONMOTOR_SUCCESS,
        payload,
    };
}