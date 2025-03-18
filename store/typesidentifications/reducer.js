import { actionTypes } from './action';

export const initialState = {
    typesidentifications: [],
};

function reducer(state = initialState, action) {
    //console.log("ACTION TYPESIDENTFICATIONS  : ", action.payload)
    switch (action.type) {
        case actionTypes.GET_TYPESIDENTIFICATIONS_SUCCESS:
            return {
                ...state,
                typesidentifications: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;
