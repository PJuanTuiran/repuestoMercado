export const actionTypes = {
    GET_BODIESVEHICLES: 'GET_BODIESVEHICLES',
    GET_BODIESVEHICLES_SUCCESS: 'GET_BODIESVEHICLES_SUCCESS',
};

export function getBodiesVehicles(payload) {
    return { type: actionTypes.GET_BODIESVEHICLES, payload };
}

export function getBodiesVehiclesSuccess(payload) {
    return {
        type: actionTypes.GET_BODIESVEHICLES_SUCCESS,
        payload,
    };
}