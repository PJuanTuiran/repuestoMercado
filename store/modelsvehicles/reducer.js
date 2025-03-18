import { actionTypes } from './action';

export const initialState = {
    modelsvehicles: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_MODELSVEHICLES_SUCCESS:
            return {
                ...state,
                modelsvehicles: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;