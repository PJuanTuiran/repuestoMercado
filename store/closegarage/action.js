export const actionTypes = {
    GET_CLOSEGARAGE: 'GET_CLOSEGARAGE',
    GET_CLOSEGARAGE_SUCCESS: 'GET_CLOSEGARAGE_SUCCESS',
};

export function getCloseGarage(payload) {
    return { type: actionTypes.GET_CLOSEGARAGE, payload };
}

export function getCloseGarageSuccess(payload) {
    return {
        type: actionTypes.GET_CLOSEGARAGE_SUCCESS,
        payload,
    };
}