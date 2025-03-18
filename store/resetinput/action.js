export const actionTypes = {
    GET_RESETINPUT: 'GET_RESETINPUT',
    GET_RESETINPUT_SUCCESS: 'GET_RESETINPUT_SUCCESS',
};

export function getResetInput(payload) {
    return { type: actionTypes.GET_RESETINPUT, payload };
}

export function getResetInputSuccess(payload) {
    return {
        type: actionTypes.GET_RESETINPUT_SUCCESS,
        payload,
    };
}