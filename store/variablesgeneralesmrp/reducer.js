import { actionTypes } from './action';

export const initialState = {
    variablesgeneralesmrp: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_VARIABLESGENERALESMRP_SUCCESS:
            return {
                ...state,
                variablesgeneralesmrp: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;