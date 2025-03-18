export const actionTypes = {
    GET_DATANEWMODELS: 'GET_DATANEWMODELS',
    GET_DATANEWMODELS_SUCCESS: 'GET_DATANEWMODELS_SUCCESS',
};

export function getDataNewModels(payload) {
    return { type: actionTypes.GET_DATANEWMODELS, payload };
}

export function getDataNewModelsSuccess(payload) {
    return {
        type: actionTypes.GET_DATANEWMODELS_SUCCESS,
        payload,
    };
}