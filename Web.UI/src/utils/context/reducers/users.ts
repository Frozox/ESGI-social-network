import {UsersActionTypes} from "../actions/users";

export const usersIS = {
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

export const usersType = {
    CREATE_USER_REQUEST: 'CREATE_USER_REQUEST',
    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    GET_USER_REQUEST: 'GET_USER_REQUEST',
    GET_USER_SUCCESS: 'GET_USER_SUCCESS',
    UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST',
    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
    DELETE_USER_REQUEST: 'DELETE_USER_REQUEST',
    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
}

export const usersReducer = (state = usersIS, action: UsersActionTypes) => {
    switch (action.type) {
        case usersType.CREATE_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case usersType.CREATE_USER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoading: false,
            }
        case usersType.GET_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case usersType.GET_USER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoading: false,
            }
        case usersType.UPDATE_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case usersType.UPDATE_USER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoading: false,
            }
        case usersType.DELETE_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case usersType.DELETE_USER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoading: false,
            }
        default:
            return state;
    }
}