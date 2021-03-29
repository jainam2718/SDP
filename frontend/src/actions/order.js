import {tokenConfig} from './auth';
import http from '../http-common';
import {
    ADDRESS_LOADED,
    ADDRESS_LOADING,
    ADDRESS_LOADING_ERROR,
    ADDRESS_DELETING,
    ADDRESS_DELETED,
    ADDRESS_DELETE_FAIL,
    ADDRESS_ADDED,
    ADDRESS_ADDING,
    ADDRESS_ADDING_ERROR,
    SELECT_ADDRESS,
    ADDRESS_SELECTED,
} from './types';

export const getAddress = (temp) => (dispatch, getState) => {
    console.log('HERE');
    dispatch({type: ADDRESS_LOADING});
    http.get('/Authuser/address/', tokenConfig(getState))
        .then((res) => {
            console.log(res.data);
            dispatch({type: ADDRESS_LOADED, payload: res.data});
        })
        .catch((err) => {
            dispatch({type: ADDRESS_LOADING_ERROR});
        });
};

export const addAddress = (obj) => (dispatch, getState) => {
    dispatch({type: ADDRESS_ADDING});

    // Request Body
    const body = JSON.stringify(obj);

    http.post('/Authuser/address/', body, tokenConfig(getState))
        .then((res) => {
            console.log(res);
            dispatch({type: ADDRESS_ADDED, payload: res.data});
        })
        .catch((err) => {
            dispatch({type: ADDRESS_ADDING_ERROR});
        });
};

export const deleteAddress = (id) => (dispatch, getState) => {
    dispatch({type: ADDRESS_DELETING});
    console.log(id);
    console.log('DELETING');
    http.delete(`/Authuser/address/${id}/`, tokenConfig(getState))
        .then((res) => {
            console.log('DELETED');
            dispatch({type: ADDRESS_DELETED, payload: id});
        })
        .catch((err) => {
            dispatch({type: ADDRESS_DELETE_FAIL});
        });
};

export const selectAddress = (id) => (dispatch, getState) => {
    http.get(`/AuthUser/address/${id}/`, tokenConfig(getState)).then((res) => {
        dispatch({type: ADDRESS_SELECTED});
    });
};
