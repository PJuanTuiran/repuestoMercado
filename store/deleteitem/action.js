export const actionTypes = {
    GET_DELETEITEM: 'GET_DELETEITEM',
    GET_DELETEITEM_SUCCESS: 'GET_DELETEITEM_SUCCESS',
};

export function getDeleteItem(payload) {
    return { type: actionTypes.GET_DELETEITEM, payload };
}

export function getDeleteItemSuccess(payload) {
    return {
        type: actionTypes.GET_DELETEITEM_SUCCESS,
        payload,
    };
}