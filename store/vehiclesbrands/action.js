export const actionTypes = {
    GET_VEHICLESBRANDS: 'GET_VEHICLESBRANDS',
    GET_VEHICLESBRANDS_SUCCESS: 'GET_VEHICLESBRANDS_SUCCESS',
};

export function getVehiclesBrands(payload) {
    return { type: actionTypes.GET_VEHICLESBRANDS, payload };
}

export function getVehiclesBrandsSuccess(payload) {
    return {
        type: actionTypes.GET_VEHICLESBRANDS_SUCCESS,
        payload,
    };
}