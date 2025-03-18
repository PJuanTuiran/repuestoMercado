import { actionTypes } from './action';

export const initialState = {
    controlacceso: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_CONTROLACCESO_SUCCESS:
            return {
                ...state,
                controlacceso: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;