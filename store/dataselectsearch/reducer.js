import { actionTypes } from './action';

export const initialState = {
    dataselectsearch: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_DATASELECTSEARCH_SUCCESS:
            return {
                ...state,
                dataselectsearch: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;