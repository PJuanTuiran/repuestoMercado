import { actionTypes } from './action';

export const initialState = {
    itemselectgarage: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_ITEMSELECTGARAGE_SUCCESS:
            return {
                ...state,
                itemselectgarage: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;