import { actionTypes } from './action';

export const initialState = {
    filtrocondicionprd: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_FILTROCONDICIONPRD_SUCCESS:
            return {
                ...state,
                filtrocondicionprd: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;