import { actionTypes } from './action';

export const initialState = {
    selectviewprd: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_SELECTVIEWPRD_SUCCESS:
            return {
                ...state,
                selectviewprd: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;