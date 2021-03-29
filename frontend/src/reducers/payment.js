import {PAYMENT_SUCCESS} from '../actions/types';

const initialState = {success: false};

export default function (state = initialState, action) {
    switch (action.type) {
        case PAYMENT_SUCCESS:
            return {
                ...state,
                success: true,
            };
        default:
            return {...state, success: false};
    }
}
