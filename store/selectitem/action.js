export const actionTypes = {
    GET_SELECTITEM: 'GET_SELECTITEM',
    GET_SELECTITEM_SUCCESS: 'GET_SELECTITEM_SUCCESS',
};

export function getSelectItem(payload) {
    return { type: actionTypes.GET_SELECTITEM, payload };
}

export function getSelectItemSuccess(payload) {
    return {
        type: actionTypes.GET_SELECTITEM_SUCCESS,
        payload,
    };
}