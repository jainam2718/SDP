import { PAYMENT_IN_PROCESS, PAYMENT_SUCCESS } from "../actions/types";

const initialState = { success: false, inProcess: false };

export default function (state = initialState, action) {
    switch (action.type) {
        case PAYMENT_SUCCESS:
            return {
                ...state,
                success: true,
            };
        case PAYMENT_IN_PROCESS:
            return {
                ...state,
                inProcess: true,
            };
        default:
            return { ...state, success: false };
    }
}
