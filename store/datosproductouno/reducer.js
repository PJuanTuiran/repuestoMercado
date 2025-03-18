import { actionTypes } from './action';

export const initialState = {
    datosproductouno: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_DATOSPRODUCTOUNO_SUCCESS:
            return {
                ...state,
                datosproductouno: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;