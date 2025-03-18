export const actionTypes = {
    GET_CTLRINPUT: 'GET_CTLRINPUT',
    GET_CTLRINPUT_SUCCESS: 'GET_CTLRINPUT_SUCCESS',
};

export function getCtlrInput(payload) {
    return { type: actionTypes.GET_CTLRINPUT, payload };
}

export function getCtlrInputSuccess(payload) {
    return {
        type: actionTypes.GET_CTLRINPUT_SUCCESS,
        payload,
    };
}