import { getAllUsers, getAllUsersExceptMe } from "../../../api/users.axios";
import { sendLogWithSeverity } from "../../../api/apiUtils";

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
        await sendLogWithSeverity(3, error);
    }
}

export const getAllUserExceptUserAction = async (dispatch: Function, id: number) => {
    dispatch({
        type: 'GET_USERS_REQUEST',
    });
    try{
        const response = await getAllUsersExceptMe(id);
        dispatch({
            type: 'GET_USERS_SUCCESS',
            payload: response,
        });
    }catch(error){
        await sendLogWithSeverity(3, error);
    }
}
