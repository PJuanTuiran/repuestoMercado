export const actionTypes = {
    GET_OPENCLOSECITY: 'GET_OPENCLOSECITY',
    GET_OPENCLOSECITY_SUCCESS: 'GET_OPENCLOSECITY_SUCCESS',
};

export function getOpenCloseCity(payload) {
    return { type: actionTypes.GET_OPENCLOSECITY, payload };
}

export function getOpenCloseCitySuccess(payload) {
    return {
        type: actionTypes.GET_OPENCLOSECITY_SUCCESS,
        payload,
    };
}