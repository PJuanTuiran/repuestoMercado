import { actionTypes } from './action';

export const initialState = {
    clearcondition: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_CLEARCONDITION_SUCCESS:
            return {
                ...state,
                clearcondition: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;