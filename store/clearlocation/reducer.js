import { actionTypes } from './action';

export const initialState = {
    clearlocation: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_CLEARLOCATION_SUCCESS:
            return {
                ...state,
                clearlocation: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;