import { SET_CURRENT_PAGE, SET_LOGIN_STATUS, SET_WAITING_STATUS, ADD_NEW_CART_ITEM, SET_NOTIFY } from './constants';

export const setLoginStatus = (payload) => ({
    type: SET_LOGIN_STATUS,
    payload,
});

export const setWaitingStatus = (payload) => ({
    type: SET_WAITING_STATUS,
    payload,
});

export const setCurrentPage = (payload) => ({
    type: SET_CURRENT_PAGE,
    payload,
});

export const addNewCartItem = (payload) => ({
    type: ADD_NEW_CART_ITEM,
    payload,
});

export const setNotify = (payload) => ({
    type: SET_NOTIFY,
    payload,
});
