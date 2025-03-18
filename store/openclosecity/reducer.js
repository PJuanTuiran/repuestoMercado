import { actionTypes } from './action';

export const initialState = {
    openclosecity: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_OPENCLOSECITY_SUCCESS:
            return {
                ...state,
                openclosecity: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;