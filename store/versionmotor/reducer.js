import { actionTypes } from './action';

export const initialState = {
    versionmotor: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_VERSIONMOTOR_SUCCESS:
            return {
                ...state,
                versionmotor: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;