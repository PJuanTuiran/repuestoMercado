import { actionTypes } from './action';

export const initialState = {
    changesearch: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_CHANGESEARCH_SUCCESS:
            return {
                ...state,
                changesearch: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;