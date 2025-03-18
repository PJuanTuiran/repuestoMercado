export const actionTypes = {
    GET_ITEMSELECTGARAGE: 'GET_ITEMSELECTGARAGE',
    GET_ITEMSELECTGARAGE_SUCCESS: 'GET_ITEMSELECTGARAGE_SUCCESS',
};

export function getItemSelectGarage(payload) {
    return { type: actionTypes.GET_ITEMSELECTGARAGE, payload };
}

export function getItemSelectGarageSuccess(payload) {
    return {
        type: actionTypes.GET_ITEMSELECTGARAGE_SUCCESS,
        payload,
    };
}