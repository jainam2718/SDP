
import {
    UPDATE_SUCCESS,
    FETCHING_DATA,
    FETCHING_COMPLETE,
    UPDATE_FAIL,
  } from '../actions/types';

  
const initialState = {
    isFetching : true,
    vendor:null,
    isUpdated : false,
};
  
export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_FAIL:
            return {
                ...state,
                isFetching: false,
                isUpdated:false,
            };
        case UPDATE_SUCCESS:
            return{
                ...state,
                isFetching:false,
                isUpdated : true,
            };
        case FETCHING_DATA:
            return{
                ...state,
                isFetching : true,
            }
        case FETCHING_COMPLETE:
            return{
                ...state,
                isFetching : false,
                vendor : action.payload,
            }
        
        default:
            return state;
    }
}