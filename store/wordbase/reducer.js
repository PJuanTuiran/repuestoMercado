import { actionTypes } from './action';

export const initialState = {
    wordbase: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_WORDBASE_SUCCESS:
            return {
                ...state,
                wordbase: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;