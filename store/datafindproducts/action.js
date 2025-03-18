export const actionTypes = {
    GET_DATAFINDPRODUCTS: 'GET_DATAFINDPRODUCTS',
    GET_DATAFINDPRODUCTS_SUCCESS: 'GET_DATAFINDPRODUCTS_SUCCESS',
};

export function getDataFindProducts(payload) {
    //console.log("GET TYPES IDENTIFICATIONS : ", payload)
    return { type: actionTypes.GET_DATAFINDPRODUCTS, payload };
}

export function getDataFindProductsSuccess(payload) {
    return {
        type: actionTypes.GET_DATAFINDPRODUCTS_SUCCESS,
        payload,
    };
}