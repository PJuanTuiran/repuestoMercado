import { actionTypes } from './action';

export const initialState = {
    filtroorderbyprd: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_FILTROORDERBYPRD_SUCCESS:
            return {
                ...state,
                filtroorderbyprd: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;