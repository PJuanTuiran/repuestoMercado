import { actionTypes } from './action';

export const initialState = {
    users: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;