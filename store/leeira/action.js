export const actionTypes = {
    GET_LEEIRA: 'GET_LEEIRA',
    GET_LEEIRA_SUCCESS: 'GET_LEEIRA_SUCCESS',
};

export function getLeeIra(payload) {
    return { type: actionTypes.GET_LEEIRA, payload };
}

export function getLeeIraSuccess(payload) {
    return {
        type: actionTypes.GET_LEEIRA_SUCCESS,
        payload,
    };
}