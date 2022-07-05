import { getMyFriends } from "../../../api/friends.axios";

export interface FriendsActionTypes {
    type: string;
    payload?: any;
}

export const getAllFriendsAction = async (dispatch: Function) => {
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