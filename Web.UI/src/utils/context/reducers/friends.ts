import { FriendsActionTypes } from "../actions/friends";

export interface FriendsDetails {
    id: number;
    firstName: string;
    lastName: string;
    user_src: number;
    user_dest: number;
    invited_at: string;
    confirmed_at: string;
    active: boolean;
}

export interface FriendsState {
    friendsList: FriendsDetails[];
    needRefreshFriends: boolean;
}

export const FriendsIS: FriendsState = {
    friendsList: [],
    needRefreshFriends: true,
}

export const friendsType = {
    GET_FRIENDS_REQUEST: 'GET_FRIENDS_REQUEST',
    GET_FRIENDS_SUCCESS: 'GET_FRIENDS_SUCCESS',
    UPDATE_FRIENDS_REQUEST: 'UPDATE_FRIENDS_REQUEST',
    UPDATE_FRIENDS_SUCCESS: 'UPDATE_FRIENDS_SUCCESS',
    DELETE_FRIENDS_REQUEST: 'DELETE_FRIENDS_REQUEST',
    DELETE_FRIENDS_SUCCESS: 'DELETE_FRIENDS_SUCCESS',
}

export const friendsReducer = (state = FriendsIS, action: FriendsActionTypes) => {
    switch (action.type) {
        case friendsType.GET_FRIENDS_REQUEST:
            return {
                ...state,
            }
        case friendsType.GET_FRIENDS_SUCCESS:
            return {
                ...state,
                friendsList: action.payload,
                needRefreshFriends: false,
            }
        case friendsType.UPDATE_FRIENDS_REQUEST:
            return {
                ...state,
            }
        case friendsType.UPDATE_FRIENDS_SUCCESS:
            return {
                ...state,
                friendsList: [action.payload, ...state.friendsList],
                needRefreshFriends: true,
            }
        case friendsType.DELETE_FRIENDS_REQUEST:
            return {
                ...state,
            }
        case friendsType.DELETE_FRIENDS_SUCCESS:
            return {
                ...state,
                friendsList: action.payload,
                needRefreshFriends: true,
            }
        default:
            return state;
    }
}