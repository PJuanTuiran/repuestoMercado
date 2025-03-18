import { actionTypes } from './action';

export const initialState = {
    menupublication: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_MENUPUBLICATION_SUCCESS:
            return {
                ...state,
                menupublication: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;