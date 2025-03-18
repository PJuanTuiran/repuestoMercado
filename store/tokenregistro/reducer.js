import { actionTypes } from './action';

export const initialState = {
    tokenregistro: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_TOKENREGISTRO_SUCCESS:
            return {
                ...state,
                tokenregistro: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;