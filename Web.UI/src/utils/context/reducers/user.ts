// create Reducer for user with initial state
import React from "react";
import { UserActionTypes } from "../actions/user";

interface UserState {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    token: string;
    isAdmin: boolean;
    preferedLanguages: Array<string>;
}

export const userIS: UserState = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    preferedLanguages: [],
    token: '',
    isAdmin: false,
};

// create action types
export const types = {
    CREATE_USER_REQUEST: 'CREATE_USER_REQUEST',
    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    GET_MY_USER_REQUEST: 'GET_MY_USER_REQUEST',
    GET_MY_USER_SUCCESS: 'GET_MY_USER_SUCCESS',
}

// create reducer
export const myUserReducer = (state = userIS, action: UserActionTypes) => {
    switch (action.type) {
        case types.CREATE_USER_REQUEST:
            return {
                ...state,
            };
        case types.CREATE_USER_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };
        case types.GET_MY_USER_REQUEST:
            return {
                ...state,
            }
        case types.GET_MY_USER_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}
