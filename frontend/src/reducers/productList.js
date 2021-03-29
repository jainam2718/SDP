import {
    PRODUCT_LIST_LOADED,
    PRODUCT_LIST_LOADING,
    PRODUCT_LIST_LOADING_FAIL,
    LOGOUT_SUCCESS,
    PRODUCT_DELETED,
    PRODUCT_DELETION_FAIL,
    PRODUCT_LIST_UPDATING,
} from '../actions/types';

const initialState = {
    isProductListLoading: false,
    isProductListLoaded: false,
    isProductListUpdated: false,
    isProductListUpdating: false,
    productList: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PRODUCT_LIST_LOADING:
            return {
                ...state,
                isProductListLoading: true,
                isProductListUpdated: false,
                isProductListUpdating: false,
            };
        case PRODUCT_LIST_LOADED:
            return {
                ...state,
                isProductListLoaded: true,
                isProductListLoading: false,
                isProductListUpdated: false,
                isProductListUpdating: false,
                productList: action.payload,
            };
        case PRODUCT_LIST_LOADING_FAIL:
            return {
                ...state,
                productList: null,
                isProductListLoaded: false,
                isProductListLoading: false,
            };
        case PRODUCT_LIST_UPDATING:
            return {
                ...state,
                isProductListUpdating: true,
                isProductListLoaded: false,
            };
        case PRODUCT_DELETED:
            return {
                ...state,
                productList: null,
                isProductListLoaded: false,
                isProductListLoading: false,
                isProductListUpdated: true,
                isProductListUpdating: false,
            };
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return {
                ...state,
                isProductListLoading: false,
                isProductListLoaded: false,
                isProductListUpdated: false,
                isProductListUpdating: false,
                productList: null,
            };
        default:
            return state;
    }
}
