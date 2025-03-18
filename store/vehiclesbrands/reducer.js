import { actionTypes } from './action';

export const initialState = {
    vehiclesbrands: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_VEHICLESBRANDS_SUCCESS:
            return {
                ...state,
                vehiclesbrands: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;