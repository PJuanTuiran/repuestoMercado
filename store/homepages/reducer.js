import { actionTypes } from './action';

export const initialState = {
    homepages: [],
};

function reducer(state = initialState, action) {
    //console.log("ACTION HOMEPAGES  : ", action.payload)
    switch (action.type) {
        case actionTypes.GET_HOMEPAGES_SUCCESS:
            return {
                ...state,
                homepages: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;
