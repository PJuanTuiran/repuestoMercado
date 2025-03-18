import { actionTypes } from './action';

export const initialState = {
    datacityprd: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_DATACITYPRD_SUCCESS:
            return {
                ...state,
                datacityprd: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;