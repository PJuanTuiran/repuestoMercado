import { actionTypes } from './action';

export const initialState = {
    closemenu: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_CLOSEMENU_SUCCESS:
            return {
                ...state,
                closemenu: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;