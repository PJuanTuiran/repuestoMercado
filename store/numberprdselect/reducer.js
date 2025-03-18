import { actionTypes } from './action';

export const initialState = {
    numberprdselect: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_NUMBERPRDSELECT_SUCCESS:
            return {
                ...state,
                numberprdselect: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;