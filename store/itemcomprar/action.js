export const actionTypes = {
    GET_ITEMCOMPRAR: 'GET_ITEMCOMPRAR',
    GET_ITEMCOMPRAR_SUCCESS: 'GET_ITEMCOMPRAR_SUCCESS',
};

export function getItemComprar(payload) {
    return { type: actionTypes.GET_ITEMCOMPRAR, payload };
}

export function getItemComprarSuccess(payload) {
    return {
        type: actionTypes.GET_ITEMCOMPRAR_SUCCESS,
        payload,
    };
}