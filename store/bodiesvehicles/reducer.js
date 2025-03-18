import { actionTypes } from './action';

export const initialState = {
    bodiesvehicles: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_BODIESVEHICLES_SUCCESS:
            return {
                ...state,
                bodiesvehicles: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;