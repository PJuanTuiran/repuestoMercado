import { actionTypes } from './action';

export const initialState = {
    viewcheckout: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_VIEWCHECKOUT_SUCCESS:
            return {
                ...state,
                viewcheckout: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;