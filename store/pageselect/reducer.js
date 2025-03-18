import { actionTypes } from './action';

export const initialState = {
    pageselect: 1,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_PAGESELECT_SUCCESS:
            return {
                ...state,
                pageselect: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;