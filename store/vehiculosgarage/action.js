export const actionTypes = {
    GET_VEHICULOSGARAGE: 'GET_VEHICULOSGARAGE',
    GET_VEHICULOSGARAGE_SUCCESS: 'GET_VEHICULOSGARAGE_SUCCESS',
};

export function getVehiculosGarage(payload) {
    return { type: actionTypes.GET_VEHICULOSGARAGE, payload };
}

export function getVehiculosGarageSuccess(payload) {
    return {
        type: actionTypes.GET_VEHICULOSGARAGE_SUCCESS,
        payload,
    };
}