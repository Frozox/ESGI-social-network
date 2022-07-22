import {UsersActionTypes} from "../actions/users";

export const myUsersIS = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    role: 0,
    createdAt: '',
    updatedAt: '',
    deletedAt: '',
    validatedAt: '',
    token: '',
}

export const userType = {
    CREATE_USER_REQUEST: 'CREATE_USER_REQUEST',
    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    GET_USER_REQUEST: 'GET_USER_REQUEST',
    GET_USER_SUCCESS: 'GET_USER_SUCCESS',
    UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST',
    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
    DELETE_USER_REQUEST: 'DELETE_USER_REQUEST',
    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
}

export const userReducer = (state = myUsersIS, action: UsersActionTypes) => {
    switch (action.type) {
        case userType.CREATE_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case userType.CREATE_USER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoading: false,
            }
        case userType.GET_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case userType.GET_USER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoading: false,
            }
        case userType.UPDATE_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case userType.UPDATE_USER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoading: false,
            }
        case userType.DELETE_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case userType.DELETE_USER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoading: false,
            }
        default:
            return state;
    }
}