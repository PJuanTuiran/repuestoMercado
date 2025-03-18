import { actionTypes } from './action';

export const initialState = {
    vehiculoseleccionado: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_SELECTEDVEHICLE_SUCCESS:
            return {
                ...state,
                vehiculoseleccionado: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;