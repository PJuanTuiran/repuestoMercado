export const actionTypes = {
    GET_EDITDATAFIND: 'GET_EDITDATAFIND',
    GET_EDITDATAFIND_SUCCESS: 'GET_EDITDATAFIND_SUCCESS',
};

export function getEditDataFind(payload) {
    //console.log("GET TYPES IDENTIFICATIONS : ", payload)
    return { type: actionTypes.GET_EDITDATAFIND, payload };
}

export function getEditDataFindSuccess(payload) {
    return {
        type: actionTypes.GET_EDITDATAFIND_SUCCESS,
        payload,
    };
}