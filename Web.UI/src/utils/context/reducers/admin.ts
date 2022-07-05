import { UsersActionTypes } from "../actions/admin";

export interface UsersDetails {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export interface UsersState {
    users: UsersDetails[];
    needRefreshUsers: boolean;
}

export const UsersIS = {
    usersList: [],
    needRefreshUsers: true,
}

export const usersType = {
    GET_USERS_REQUEST: 'GET_USERS_REQUEST',
    GET_USERS_SUCCESS: 'GET_USERS_SUCCESS',
    UPDATE_USERS_REQUEST: 'UPDATE_USERS_REQUEST',
    UPDATE_USERS_SUCCESS: 'UPDATE_USERS_SUCCESS',
    DELETE_USERS_REQUEST: 'DELETE_USERS_REQUEST',
    DELETE_USERS_SUCCESS: 'DELETE_USERS_SUCCESS',
}

export const usersReducer = (state = UsersIS, action: UsersActionTypes) => {
    switch (action.type) {
        case usersType.GET_USERS_REQUEST:
            return {
                ...state,
            }
        case usersType.GET_USERS_SUCCESS:
            return {
                ...state,
                usersList: action.payload,
                needRefreshUsers: false,
            }
        case usersType.UPDATE_USERS_REQUEST:
            return {
                ...state,
            }
        case usersType.UPDATE_USERS_SUCCESS:
            return {
                ...state,
                usersList: [action.payload, ...state.usersList],
                needRefreshUsers: true,
            }
        case usersType.DELETE_USERS_REQUEST:
            return {
                ...state,
            }
        case usersType.DELETE_USERS_SUCCESS:
            return {
                ...state,
                usersList: action.payload,
                needRefreshUsers: true,
            }
        default:
            return state;
    }
}