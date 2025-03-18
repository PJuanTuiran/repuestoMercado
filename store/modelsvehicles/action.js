export const actionTypes = {
    GET_MODELSVEHICLES: 'GET_MODELSVEHICLES',
    GET_MODELSVEHICLES_SUCCESS: 'GET_MODELSVEHICLES_SUCCESS',
};

export function getModelsVehicles(payload) {
    return { type: actionTypes.GET_MODELSVEHICLES, payload };
}

export function getModelsVehiclesSuccess(payload) {
    return {
        type: actionTypes.GET_MODELSVEHICLES_SUCCESS,
        payload,
    };
}