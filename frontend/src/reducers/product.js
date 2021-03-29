import {
    PRODUCT_LOADING,
    PRODUCT_LOADED,
    PRODUCT_LOADING_FAIL,
    PRODUCT_ADDED,
    PRODUCT_REMOVED,
    PRODUCT_EDITED,
    PRODUCT_EDIT_FAIL,
    PRODUCT_DELETED,
    PRODUCT_DELETION_FAIL,
    PRODUCT_IMAGES_UPLOADED,
    PRODUCT_IMAGES_UPLOAD_FAIL,
    PRODUCT_IMAGES_LOADING,
    PRODUCT_IMAGES_LOADED,
    LOGOUT_SUCCESS,
    PRODUCT_REVIEWS_LOADED,
    PRODUCT_REVIEWS_LOADING,
    PRODUCT_REVIEWS_LOAD_FAIL,
    PRODUCT_REVIEWS_DELETED,
    PRODUCT_REVIEWS_DELETING,
} from '../actions/types';

const initialState = {
    isProductLoading: false,
    isProductAdded: false,
    isProductLoaded: false,
    product: null,
    isProductUpdated: false,
    isProductDeleted: false,
    areProductImagesUploaded: false,
    areImagesLoading: false,
    areImagesLoaded: false,
    productImages: null,
    comments: [],
    isCommentLoading: false,
    isCommentLoaded: false,
    commentDeleted: false,
    commentDeleting: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PRODUCT_LOADING:
            return {
                ...state,
                isProductLoading: true,
                areProductImagesUploaded: false,
                comments: [],
                commentDeleting: false,
                isProductAdded: false,
            };
        case PRODUCT_LOADED:
            console.log('LOADED');
            return {
                ...state,
                isProductLoaded: true,
                isProductLoading: false,
                product: action.payload,
                isProductAdded: false,
                comments: [],
                areProductImagesUploaded: false,
                commentDeleting: false,
            };
        case PRODUCT_REMOVED:
        case PRODUCT_LOADING_FAIL:
            return {
                ...state,
                product: null,
                isProductLoaded: false,
                isProductAdded: false,
                comments: [],
                isProductLoading: false,
                commentDeleting: false,
                areProductImagesUploaded: false,
            };
        case PRODUCT_ADDED:
            return {
                ...state,
                areProductImagesUploaded: false,
                comments: [],
                commentDeleting: false,
                isProductAdded: true,
            };
        case PRODUCT_EDITED:
            return {
                ...state,
                areProductImagesUploaded: false,
                isProductAdded: false,
                isProductUpdated: true,
                comments: [],
                commentDeleting: false,
            };
        case PRODUCT_EDIT_FAIL:
            return {
                ...state,
                areProductImagesUploaded: false,
                isProductAdded: false,
                comments: [],
                commentDeleting: false,
                isProductUpdated: false,
            };
        case PRODUCT_IMAGES_UPLOADED:
            return {
                ...state,
                isProductAdded: false,
                comments: [],
                commentDeleting: false,
                areProductImagesUploaded: true,
            };
        case PRODUCT_IMAGES_LOADING:
            return {
                ...state,
                isProductAdded: false,
                areImagesLoaded: false,
                comments: [],
                commentDeleting: false,
                areImagesLoading: true,
            };
        case PRODUCT_IMAGES_LOADED:
            console.log(action.payload);
            return {
                ...state,
                areImagesLoaded: true,
                comments: [],
                areImagesLoading: false,
                isProductAdded: false,
                commentDeleting: false,
                productImages: action.payload,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isProductLoading: false,
                isProductAdded: false,
                isProductLoaded: false,
                product: null,
                isProductUpdated: false,
                isProductDeleted: false,
                areProductImagesUploaded: false,
                areImagesLoading: false,
                comments: [],
                areImagesLoaded: false,
                commentDeleting: false,
                productImages: null,
            };
        case PRODUCT_REVIEWS_LOADED:
            return {
                ...state,
                comments: action.payload,
                commentDeleted: false,
                isCommentLoading: false,
                isCommentLoaded: true,
                commentDeleting: false,
            };
        case PRODUCT_REVIEWS_LOADING:
            return {
                ...state,
                comments: [],
                isCommentLoading: true,
                isCommentLoaded: false,
                commentDeleting: false,
            };
        case PRODUCT_REVIEWS_LOAD_FAIL:
            return {
                ...state,
                comments: [],
                isCommentLoading: false,
                isCommentLoaded: false,
                commentDeleting: false,
            };
        case PRODUCT_REVIEWS_DELETED:
            console.log('delete');
            state.comments.map((item, index) => {
                if (item.id == action.payload) state.comments.splice(index, 1);
            });
            return {
                ...state,
                comments: state.comments,
                comments: [],
                commentDeleted: true,
                commentDeleting: false,
            };
        case PRODUCT_REVIEWS_DELETING:
            return {
                ...state,
                comments: [],
                commentDeleted: false,
                commentDeleting: true,
            };
        default:
            return state;
    }
}
