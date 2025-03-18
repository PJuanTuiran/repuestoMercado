import { actionTypes } from './action';

export const initialState = {
    filtergarage: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_FILTERGARAGE_SUCCESS:
            return {
                ...state,
                filtergarage: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;