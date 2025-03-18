import { actionTypes } from './action';

export const initialState = {
    typesvehicles: [],
};

function reducer(state = initialState, action) {
    //console.log("ACTION TYPESVEHICLES  : ", action.payload)
    switch (action.type) {
        case actionTypes.GET_TYPESVEHICLES_SUCCESS:
            return {
                ...state,
                typesvehicles: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;