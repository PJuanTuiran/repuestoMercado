import { actionTypes } from './action';

export const initialState = {
    vehiculosgarage: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_VEHICULOSGARAGE_SUCCESS:
            return {
                ...state,
                vehiculosgarage: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;