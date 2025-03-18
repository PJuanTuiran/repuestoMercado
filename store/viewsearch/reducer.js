import { actionTypes } from './action';

export const initialState = {
    viewsearch: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_VIEWSEARCH_SUCCESS:
            return {
                ...state,
                viewsearch: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;