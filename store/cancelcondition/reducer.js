import { actionTypes } from './action';

export const initialState = {
    cancelcondition: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_CANCELCONDITION_SUCCESS:
            return {
                ...state,
                cancelcondition: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;