import { actionTypes } from './action';

export const initialState = {
    datasearchinteractive: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_DATASEARCHINTERACTIVE_SUCCESS:
            return {
                ...state,
                datasearchinteractive: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;