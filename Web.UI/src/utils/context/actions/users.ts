import {getUserById, getMyUserByMail} from "../../../api/users.axios";

export interface UsersActionTypes {
    type: string;
    payload?: any;
}

export const getMyUserByMailAction = async (dispatch: Function, mail: string) => {
    dispatch({
        type: 'GET_USER_REQUEST',
    });

    try {
        const response = await getMyUserByMail(mail);
        dispatch({
            type: 'GET_USER_SUCCESS',
            payload: response,
        });
    } catch (error) {
        console.log(error);
    }
}

export const getUserByIdAction = async (dispatch: Function, id: number) => {
    dispatch({
        type: 'GET_USER_REQUEST',
    });

    try {
        const response = await getUserById(id);
        dispatch({
            type: 'GET_USER_BY_ID_SUCCESS',
            payload: response,
        });
    } catch (error) {
        console.log(error);
    }
}