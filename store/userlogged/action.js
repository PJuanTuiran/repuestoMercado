export const actionTypes = {
    GET_USERLOGGED: 'GET_USERLOGGED',
    GET_USERLOGGED_SUCCESS: 'GET_USERLOGGED_SUCCESS',
};

export function getUserLogged(payload) {
    //console.log("GET TYPES IDENTIFICATIONS : ", payload)
    return { type: actionTypes.GET_USERLOGGED, payload };
}

export function getUserLoggedSuccess(payload) {
    return {
        type: actionTypes.GET_USERLOGGED_SUCCESS,
        payload,
    };
}