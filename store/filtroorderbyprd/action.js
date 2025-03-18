export const actionTypes = {
    GET_FILTROORDERBYPRD: 'GET_FILTROORDERBYPRD',
    GET_FILTROORDERBYPRD_SUCCESS: 'GET_FILTROORDERBYPRD_SUCCESS',
};

export function getFiltroOrderByPrd(payload) {
    return { type: actionTypes.GET_FILTROORDERBYPRD, payload };
}

export function getFiltroOrderByPrdSuccess(payload) {
    return {
        type: actionTypes.GET_FILTROORDERBYPRD_SUCCESS,
        payload,
    };
}