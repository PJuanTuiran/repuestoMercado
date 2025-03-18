export const actionTypes = {
    GET_DATACITYPRD: 'GET_DATACITYPRD',
    GET_DATACITYPRD_SUCCESS: 'GET_DATACITYPRD_SUCCESS',
};

export function getDataCityPrd(payload) {
    return { type: actionTypes.GET_DATACITYPRD, payload };
}

export function getDataCityPrdSuccess(payload) {
    return {
        type: actionTypes.GET_DATACITYPRD_SUCCESS,
        payload,
    };
}