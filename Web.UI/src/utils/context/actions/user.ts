// create action for users
import { getMyUser } from '../../../api/users.axios';
import { types } from '../reducers/user';
export interface UserActionTypes {
    type: string;
    payload?: any;
}

export const getMyUserActions = async (dispatch: Function) => {

    dispatch({
        type: types.GET_MY_USER_REQUEST,
    });
    const userId = localStorage.getItem("myUser");

    try {
        const response = userId && await getMyUser(Number(userId));
        dispatch({
            type: types.GET_MY_USER_SUCCESS,
            payload: response,
        });


    } catch (error) {
        console.log(error);
    }
}


