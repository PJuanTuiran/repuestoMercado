export const actionTypes = {
    GET_CATEGORIES: 'GET_CATEGORIES',
    GET_CATEGORIES_SUCCESS: 'GET_CATEGORIES_SUCCESS',
};

export function getCategories(payload) {
    return { type: actionTypes.GET_CATEGORIES, payload };
}

export function getCategoriesSuccess(payload) {
    return {
        type: actionTypes.GET_CATEGORIES_SUCCESS,
        payload,
    };
}