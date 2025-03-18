import { actionTypes } from './action';

export const initialState = {
    cityselect: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_CITYSELECT_SUCCESS:
            return {
                ...state,
                cityselect: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;