import { actionTypes } from './action';

export const initialState = {
    datanewcylinder: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_DATANEWCYLINDER_SUCCESS:
            return {
                ...state,
                datanewcylinder: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;