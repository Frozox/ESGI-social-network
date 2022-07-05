import { getAllUsers } from "../../../api/users.axios";

export interface UsersActionTypes {
    type: string;
    payload?: any;
}

export const getAllUserAction = async (dispatch: Function) => {
    dispatch({
        type: 'GET_USERS_REQUEST',
    });
    try{
        const response = await getAllUsers();
        dispatch({
            type: 'GET_USERS_SUCCESS',
            payload: response,
        });
    }catch(error){
        console.log(error);
    }
}
