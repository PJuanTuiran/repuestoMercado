import { actionTypes } from './action';

export const initialState = {
    userlogged: [],
};

function reducer(state = initialState, action) {
    //console.log("ACTION TYPESIDENTFICATIONS  : ", action.payload)
    switch (action.type) {
        case actionTypes.GET_USERLOGGED_SUCCESS:
            return {
                ...state,
                userlogged: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;