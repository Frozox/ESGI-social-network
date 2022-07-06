import { addNewFriend, getMyFriends } from "../../../api/friends.axios";

export interface FriendsActionTypes {
    type: string;
    payload?: any;
}

export const getAllFriendsAction = async (dispatch: Function, id: number) => {
    dispatch({
        type: 'GET_FRIENDS_REQUEST',
    });
    try{
        const response = await getMyFriends();
        dispatch({
            type: 'GET_FRIENDS_SUCCESS',
            payload: response,
        });
    }catch(error){
        console.log(error);
    }
}

export const createNewFriendRequestAction = (dispatch: Function, data: any) => {
    dispatch({
        type: 'CREATE_FRIEND_REQUEST',
    });
    try{
        const response = addNewFriend(data);
        dispatch({
            type: 'CREATE_FRIEND_SUCCESS',
            payload: response,
        });
    }catch(error){
        console.log(error);
    }
}