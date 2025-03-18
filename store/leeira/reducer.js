import { actionTypes } from './action';

export const initialState = {
    ira: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_LEEIRA_SUCCESS:
            return {
                ...state,
                ira: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;