export const actionTypes = {
    GET_USERS: 'GET_USERS',
    GET_USERS_SUCCESS: 'GET_USERS_SUCCESS',
};

export function getUsers(payload) {
    return { type: actionTypes.GET_USERS, payload };
}

export function getUsersSuccess(payload) {
    return {
        type: actionTypes.GET_USERS_SUCCESS,
        payload,
    };
}