import { actionTypes } from './action';

export const initialState = {
    addlogin: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_ADDLOGIN_SUCCESS:
            return {
                ...state,
                addlogin: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;