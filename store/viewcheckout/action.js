export const actionTypes = {
    GET_VIEWCHECKOUT: 'GET_VIEWCHECKOUT',
    GET_VIEWCHECKOUT_SUCCESS: 'GET_VIEWCHECKOUT_SUCCESS',
};

export function getViewCheckout(payload) {
    return { type: actionTypes.GET_VIEWCHECKOUT, payload };
}

export function getViewCheckoutSuccess(payload) {
    return {
        type: actionTypes.GET_VIEWCHECKOUT_SUCCESS,
        payload,
    };
}