import React from 'react';
import { getAllUserExceptUserAction } from '../utils/context/actions/admin';
import { createNewFriendRequestAction } from '../utils/context/actions/friends';
import { UsersDetails } from '../utils/context/reducers/admin';
//import { FriendsDetails } from '../utils/context/reducers/friends';
import { useStoreContext } from "../utils/context/StoreContext";

const FriendPage = () => {

    const { dispatch, state: { users: { usersList, needRefreshUsers }, auth: { data } } } = useStoreContext();
    const [disable, setDisable] = React.useState(false);
    
    React.useEffect(() => {
        if (needRefreshUsers) { getAllUserExceptUserAction(dispatch, data)}
    }, [needRefreshUsers]);
    console.log(usersList);
    
    const handleAddFriend = (userId: string) => {
        const friend = {
            user_src: Number(data),
            user_dest: userId,
            invite_at: new Date().toISOString(),
            confirm_at: null,
            active: false
        }
        console.log(friend);
        createNewFriendRequestAction(dispatch, friend);
        setDisable(true)
    }

    return (
        <div className='w-full h-screen'>
            <h1>FriendPage</h1>
            <div>
                {usersList.map((user: UsersDetails, index) => {
                    return (
                    
                    <div key={index}>
                        <p>{user.firstName}</p>
                        <p>{user.lastName}</p>
                        <button disabled={disable} onClick={() => handleAddFriend(user.id)}>Add Friend</button>
                    </div>
                )}
                )}
            </div>
        </div>
    )
}

export default FriendPage;

function state(state: any) {
    throw new Error('Function not implemented.');
}
