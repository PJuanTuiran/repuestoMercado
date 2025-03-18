export const actionTypes = {
    GET_MENUPUBLICATION: 'GET_MENUPUBLICATION',
    GET_MENUPUBLICATION_SUCCESS: 'GET_MENUPUBLICATION_SUCCESS',
};

export function getMenuPublication(payload) {
    return { type: actionTypes.GET_MENUPUBLICATION, payload };
}

export function getMenuPublicationSuccess(payload) {
    return {
        type: actionTypes.GET_MENUPUBLICATION_SUCCESS,
        payload,
    };
}