import { actionTypes } from './action';

export const initialState = {
    selectedaddress: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_SELECTEDADDRESS_SUCCESS:
            return {
                ...state,
                selectedaddress: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;