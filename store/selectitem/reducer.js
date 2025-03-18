import { actionTypes } from './action';

export const initialState = {
    selectitem: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_SELECTITEM_SUCCESS:
            return {
                ...state,
                selectitem: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;