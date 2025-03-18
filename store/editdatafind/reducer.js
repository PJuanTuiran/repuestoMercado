import { actionTypes } from './action';

export const initialState = {
    editdatafind: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_EDITDATAFIND_SUCCESS:
            return {
                ...state,
                editdatafind: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;