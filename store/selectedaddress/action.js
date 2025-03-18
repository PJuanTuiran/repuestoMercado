export const actionTypes = {
    GET_SELECTEDADDRESS: 'GET_SELECTEDADDRESS',
    GET_SELECTEDADDRESS_SUCCESS: 'GET_SELECTEDADDRESS_SUCCESS',
};

export function getSelectedAddress(payload) {
    return { type: actionTypes.GET_SELECTEDADDRESS, payload };
}

export function getSelectedAddressSuccess(payload) {
    return {
        type: actionTypes.GET_SELECTEDADDRESS_SUCCESS,
        payload,
    };
}