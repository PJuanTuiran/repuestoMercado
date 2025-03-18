export const actionTypes = {
    GET_YEARSVEHICLES: 'GET_YEARSVEHICLES',
    GET_YEARSVEHICLES_SUCCESS: 'GET_YEARSVEHICLES_SUCCESS',
};

export function getYearsVehicles(payload) {
    return { type: actionTypes.GET_YEARSVEHICLES, payload };
}

export function getYearsVehiclesSuccess(payload) {
    return {
        type: actionTypes.GET_YEARSVEHICLES_SUCCESS,
        payload,
    };
}