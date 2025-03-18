import { actionTypes } from './action';

export const initialState = {
    datanewmodels: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_DATANEWMODELS_SUCCESS:
            return {
                ...state,
                datanewmodels: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;