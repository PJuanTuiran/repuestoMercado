export const actionTypes = {
    GET_DATANEWCYLINDER: 'GET_DATANEWCYLINDER',
    GET_DATANEWCYLINDER_SUCCESS: 'GET_DATANEWCYLINDER_SUCCESS',
};

export function getDataNewCylinder(payload) {
    return { type: actionTypes.GET_DATANEWCYLINDER, payload };
}

export function getDataNewCylinderSuccess(payload) {
    return {
        type: actionTypes.GET_DATANEWCYLINDER_SUCCESS,
        payload,
    };
}