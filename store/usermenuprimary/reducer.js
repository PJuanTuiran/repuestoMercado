import { actionTypes } from './action';

export const initialState = {
    usermenuprimary: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_USERMENUPRIMARY_SUCCESS:
            return {
                ...state,
                usermenuprimary: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;