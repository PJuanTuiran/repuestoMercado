import { actionTypes } from './action';

export const initialState = {
    datafindproducts: [],
};

function reducer(state = initialState, action) {
    //console.log("DATA FIND PRODUCTS  : ", action.payload)
    switch (action.type) {
        case actionTypes.GET_DATAFINDPRODUCTS_SUCCESS:
            return {
                ...state,
                datafindproducts: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;