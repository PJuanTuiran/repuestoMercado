import { actionTypes } from './action';

export const initialState = {
    resetinput: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_RESETINPUT_SUCCESS:
            return {
                ...state,
                resetinput: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;