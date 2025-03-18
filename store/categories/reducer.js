import { actionTypes } from './action';

export const initialState = {
    categories: [],
};

function reducer(state = initialState, action) {
    //console.log("ACTION CATEGORIES : ", action.payload)
    switch (action.type) {
        case actionTypes.GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;
