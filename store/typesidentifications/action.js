export const actionTypes = {
    GET_TYPESIDENTIFICATIONS: 'GET_TYPESIDENTIFICATIONS',
    GET_TYPESIDENTIFICATIONS_SUCCESS: 'GET_TYPESIDENTIFICATIONS_SUCCESS',
};

export function getTypesIdentifications(payload) {
    //console.log("GET TYPES IDENTIFICATIONS : ", payload)
    return { type: actionTypes.GET_TYPESIDENTIFICATIONS, payload };
}

export function getTypesIdentificationsSuccess(payload) {
    return {
        type: actionTypes.GET_TYPESIDENTIFICATIONS_SUCCESS,
        payload,
    };
}