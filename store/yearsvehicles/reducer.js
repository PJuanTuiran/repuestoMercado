import { actionTypes } from './action';

export const initialState = {
    yearsvehicles: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_YEARSVEHICLES_SUCCESS:
            return {
                ...state,
                yearsvehicles: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;