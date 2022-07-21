import React from 'react';
import { getAllUserExceptUserAction } from '../utils/context/actions/admin';
import { createNewFriendRequestAction, getAllFriendsAction, updateFriendRequestAction } from '../utils/context/actions/friends';
import { UsersDetails } from '../utils/context/reducers/admin';
import { FriendsDetails } from '../utils/context/reducers/friends';
import { useStoreContext } from "../utils/context/StoreContext";

const FriendPage = () => {

    const { dispatch, state: { users: { usersList, needRefreshUsers }, auth: { data }, friends: { friendsList, needRefreshFriends } } } = useStoreContext();
    const [disable, setDisable] = React.useState(false);

    React.useEffect(() => {
        if (needRefreshUsers) { getAllUserExceptUserAction(dispatch, data) }
    }, [needRefreshUsers]);
    console.log(usersList);

    React.useEffect(() => {
        if (needRefreshFriends) { getAllFriendsAction(dispatch, data) }
    }, [needRefreshFriends]);
    console.log(friendsList);

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

    const handleAccept = (friendId: string) => {
        const friend = {
            confirmed_at: new Date().toISOString(),
            active: true
        }
        console.log(friendId);
        console.log(friend);
        updateFriendRequestAction(dispatch, friend, friendId);
        setDisable(true)
    }

    return (
        <div className='w-full h-screen'>
            <div>
                <h1>FriendPage</h1>
                <div>
                    {usersList.map((user: UsersDetails, index) => {
                        return (

                            <div key={index}>
                                <p>{user.firstName}</p>
                                <p>{user.lastName}</p>
                                <button disabled={disable} onClick={() => handleAddFriend(user.id)}>Add Friend</button>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>
            <div>
                <h2>Friend Request</h2>
                <div> 
                {friendsList.map((friend: FriendsDetails, index) => {
                        return (

                            <div key={index}>
                                <p>{friend.send.firstName}</p>
                                <p>{friend.send.lastName}</p>
                                <button disabled={disable} onClick={() => handleAccept(friend.id)}>Accept</button>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>
        </div>
    )
}

export default FriendPage;

function state(state: any) {
    throw new Error('Function not implemented.');
}
function getAllFriendRequestAction(dispatch: ({ }: {}) => void, data: string | null) {
    throw new Error('Function not implemented.');
}

