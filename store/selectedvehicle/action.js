export const actionTypes = {
    GET_SELECTEDVEHICLE: 'GET_SELECTEDVEHICLE',
    GET_SELECTEDVEHICLE_SUCCESS: 'GET_SELECTEDVEHICLE_SUCCESS',
};

export function getSelectedVehicle(payload) {
    return { type: actionTypes.GET_SELECTEDVEHICLE, payload };
}

export function getSelectedVehicleSuccess(payload) {
    return {
        type: actionTypes.GET_SELECTEDVEHICLE_SUCCESS,
        payload,
    };
}