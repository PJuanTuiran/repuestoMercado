import { actionTypes } from './action';

export const initialState = {
    selectcondition: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_SELECTCONDITION_SUCCESS:
            return {
                ...state,
                selectcondition: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;