import {
    SHOP_LIST_LOADED,
    SHOP_LIST_LOADING,
    SHOP_LIST_LOADING_FAIL,
    LOGOUT_SUCCESS,
} from '../actions/types';

const initialState = {
    isShopListLoading: false,
    isShopListLoaded: false,
    shopList: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SHOP_LIST_LOADING:
            console.log('SHOP_LIST_LOADING');
            return {
                ...state,
                isShopListLoading: true,
            };
        case SHOP_LIST_LOADED:
            console.log('SHOP_LIST_LOADED');
            return {
                ...state,
                isShopListLoaded: true,
                isShopListLoading: false,
                shopList: action.payload,
            };
        case SHOP_LIST_LOADING_FAIL:
            return {
                ...state,
                shopList: null,
                isShopListLoaded: false,
                isShopListLoading: false,
            };
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return {
                ...state,
                isShopListLoading: false,
                isShopListLoaded: false,
                shopList: [],
            };
        default:
            return state;
    }
}
