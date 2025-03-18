export const actionTypes = {
    GET_WORDBASE: 'GET_WORDBASE',
    GET_WORDBASE_SUCCESS: 'GET_WORDBASE_SUCCESS',
};

export function getWordBase(payload) {
    //console.log("GET TYPES IDENTIFICATIONS : ", payload)
    return { type: actionTypes.GET_WORDBASE, payload };
}

export function getWordBaseSuccess(payload) {
    //console.log("GET WORD BASE : ", payload)
    return {
        type: actionTypes.GET_WORDBASE_SUCCESS,
        payload,
    };
}