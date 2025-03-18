import { actionTypes } from './action';

export const initialState = {
    cambiodireccion: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_CAMBIODIRECCION_SUCCESS:
            return {
                ...state,
                cambiodireccion: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;