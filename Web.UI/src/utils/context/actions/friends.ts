import { acceptFriendRequest, addNewFriend, getMyFriends } from "../../../api/friends.axios";
import { sendLogWithSeverity } from "../../../api/apiUtils";
import { NavigateFunction } from "react-router-dom";

export interface FriendsActionTypes {
    type: string;
    payload?: any;
}

export const getAllFriendsAction = async (dispatch: Function, id: number) => {
    dispatch({
        type: 'GET_FRIENDS_REQUEST',
    });
    try {
        const response = await getMyFriends(id);
        dispatch({
            type: 'GET_FRIENDS_SUCCESS',
            payload: response,
        });
    } catch (error) {
        await sendLogWithSeverity(3, error);
    }
}

export const createNewFriendRequestAction = async (dispatch: Function, data: any) => {
    dispatch({
        type: 'CREATE_FRIEND_REQUEST',
    });
    try {
        const response = addNewFriend(data);
        dispatch({
            type: 'CREATE_FRIEND_SUCCESS',
            payload: response,
        });
    } catch (error) {
        await sendLogWithSeverity(3, error);
    }
}

export const updateFriendRequestAction = async (dispatch: Function, srcId: number, destId: number) => {
    dispatch({
        type: 'UPDATE_FRIEND_REQUEST',
    });
    try {
        const response = acceptFriendRequest(srcId, destId);
        dispatch({
            type: 'UPDATE_FRIEND_SUCCESS',
            payload: response,
        });
    } catch (error) {
        await sendLogWithSeverity(3, error);
    }
}