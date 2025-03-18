import { actionTypes } from './action';

export const initialState = {
    itemcomprar: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_ITEMCOMPRAR_SUCCESS:
            return {
                ...state,
                itemcomprar: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;