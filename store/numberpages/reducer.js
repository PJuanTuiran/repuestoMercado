import { actionTypes } from './action';

export const initialState = {
    numberpages: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_NUMBERPAGES_SUCCESS:
            return {
                ...state,
                numberpages: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;