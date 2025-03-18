import { actionTypes } from './action';

export const initialState = {
    gripselect: 1,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_GRIPSELECT_SUCCESS:
            return {
                ...state,
                gripselect: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;