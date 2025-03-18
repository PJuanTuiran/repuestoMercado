export const actionTypes = {
    GET_EDITDATA: 'GET_EDITDATA',
    GET_EDITDATA_SUCCESS: 'GET_EDITDATA_SUCCESS',
};

export function getEditData(payload) {
    //console.log("GET TYPES IDENTIFICATIONS : ", payload)
    return { type: actionTypes.GET_EDITDATA, payload };
}

export function getEditDataSuccess(payload) {
    return {
        type: actionTypes.GET_EDITDATA_SUCCESS,
        payload,
    };
}