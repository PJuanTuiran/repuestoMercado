export const actionTypes = {
    GET_TYPESVEHICLES: 'GET_TYPESVEHICLES',
    GET_TYPESVEHICLES_SUCCESS: 'GET_TYPESVEHICLES_SUCCESS',
};

export function getTypesVehicles(payload) {
    //console.log("GET TYPES IDENTIFICATIONS : ", payload)
    return { type: actionTypes.GET_TYPESVEHICLES, payload };
}

export function getTypesVehiclesSuccess(payload) {
    return {
        type: actionTypes.GET_TYPESVEHICLES_SUCCESS,
        payload,
    };
}