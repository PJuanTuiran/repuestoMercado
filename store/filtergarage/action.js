export const actionTypes = {
    GET_FILTERGARAGE: 'GET_FILTERGARAGE',
    GET_FILTERGARAGE_SUCCESS: 'GET_FILTERGARAGE_SUCCESS',
};

export function getFilterGarage(payload) {
    return { type: actionTypes.GET_FILTERGARAGE, payload };
}

export function getFilterGarageSuccess(payload) {
    return {
        type: actionTypes.GET_FILTERGARAGE_SUCCESS,
        payload,
    };
}