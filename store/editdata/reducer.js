import { actionTypes } from './action';

export const initialState = {
    editdata: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_EDITDATA_SUCCESS:
            return {
                ...state,
                editdata: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;