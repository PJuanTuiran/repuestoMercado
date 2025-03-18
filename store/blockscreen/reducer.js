import { actionTypes } from './action';

export const initialState = {
    blockscreen: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_BLOCKSCREEN_SUCCESS:
            return {
                ...state,
                blockscreen: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;