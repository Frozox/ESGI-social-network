import {getMyUser, getUserById} from "../../../api/users.axios";

export interface UsersActionTypes {
    type: string;
    payload?: any;
}

export const getMyUserAction = async (dispatch: Function) => {
    dispatch({
        type: 'GET_USER_REQUEST',
    });

    try {
        const response = await getMyUser();
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