import { actionTypes } from './action';

export const initialState = {
    deleteitem: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_DELETEITEM_SUCCESS:
            return {
                ...state,
                deleteitem: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;