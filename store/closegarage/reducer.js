import { actionTypes } from './action';

export const initialState = {
    closegarage: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_CLOSEGARAGE_SUCCESS:
            return {
                ...state,
                closegarage: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;