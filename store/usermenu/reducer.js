import { actionTypes } from './action';

export const initialState = {
    usermenu: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_USERMENU_SUCCESS:
            return {
                ...state,
                usermenu: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;