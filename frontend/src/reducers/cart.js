import {
    CART_ITEM_ADDED,
    CART_ITEM_ADD_FAIL,
    CART_LOADED,
    CART_LOADING,
    CART_LOAD_FAIL,
    CART_ITEM_DELETED,
    CART_ITEM_DELETION_FAIL,
    CART_ITEM_MODIFIED,
    CART_ITEM_MODIFY_FAIL,
    LOGIN_FAIL,
} from '../actions/types';

const initialState = {
    isItemAdded: false,
    isCartLoading: false,
    cartItems: [],
    cartItemDeleted: false,
    cartUpdated: false,
    totalAmt: 0,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CART_ITEM_ADDED:
            return {
                ...state,
                cartUpdated: true,
            };
        case CART_ITEM_ADD_FAIL:
            return {
                ...state,
                isItemAdded: false,
            };
        case CART_LOADING:
            return {
                ...state,
                isCartLoading: true,
                cartUpdated: false,
            };
        case CART_LOADED:
            var total = 0;
            action.payload.map((item) => {
                total += item.quantity * item.product.amount;
            });
            return {
                ...state,
                cartItems: action.payload,
                isCartLoading: false,
                cartItemDeleted: false,
                totalAmt: total,
            };
        case CART_LOAD_FAIL:
        case CART_ITEM_DELETION_FAIL:
        case CART_ITEM_MODIFY_FAIL:
            return {
                ...state,
                cartItems: [],
                isCartLoading: false,
            };
        case CART_ITEM_DELETED:
            state.cartItems.map((item, index) => {
                if (item.id == action.payload) state.cartItems.splice(index, 1);
            });
            var total = 0;
            state.cartItems.map((item) => {
                total += item.quantity * item.product.amount;
            });
            return {
                ...state,
                cartItems: state.cartItems,
                cartUpdated: false,
                isCartLoading: false,
                totalAmt: total,
            };

        case CART_ITEM_MODIFIED:
            var obj = action.payload;
            var total = 0;
            state.cartItems.map((item) => {
                if (item.id != obj.id)
                    total += item.quantity * item.product.amount;
                else {
                    item.quantity = obj.quantity;
                    total += obj.quantity * item.product.amount;
                }
            });
            state.totalAmt = total;
            return {
                ...state,
                totalAmt: total,
                cartItems: state.cartItems,
            };
        default:
            return state;
    }
}
