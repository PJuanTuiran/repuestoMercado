import { actionTypes } from './action';

export const initialState = {
    refreshpage: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_REFRESHPAGE_SUCCESS:
            return {
                ...state,
                refreshpage: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;