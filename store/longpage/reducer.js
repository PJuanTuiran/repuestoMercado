import { actionTypes } from './action';

export const initialState = {
    longpage: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_LONGPAGE_SUCCESS:
            return {
                ...state,
                longpage: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;