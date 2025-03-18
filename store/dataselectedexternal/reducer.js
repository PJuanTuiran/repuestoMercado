import { actionTypes } from './action';

export const initialState = {
    dataselectedexternal: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_DATASELECTEDEXTERNAL_SUCCESS:
            return {
                ...state,
                dataselectedexternal: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;