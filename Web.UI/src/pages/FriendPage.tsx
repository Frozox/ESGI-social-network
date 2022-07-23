import React from 'react';
import { set } from 'react-hook-form';
import { getAllUserExceptUserAction } from '../utils/context/actions/admin';
import { createNewFriendRequestAction, getAllFriendsAction, updateFriendRequestAction } from '../utils/context/actions/friends';
import { UsersDetails } from '../utils/context/reducers/admin';
import { FriendsDetails } from '../utils/context/reducers/friends';
import { useStoreContext } from "../utils/context/StoreContext";

const FriendPage = () => {

    const { dispatch, state: { users: { usersList, needRefreshUsers }, auth: { data }, friends: { friendsList, needRefreshFriends } } } = useStoreContext();
    const [disable, setDisable] = React.useState(false);
    const [buttonText, setButtonText] = React.useState('Add Friend');
    const [btnColor, setBtnColor] = React.useState("bg-blue-500 hover:bg-blue-700");

    React.useEffect(() => {
        if (needRefreshUsers) { getAllUserExceptUserAction(dispatch, data) }
    }, [needRefreshUsers]);
    console.log(usersList);

    React.useEffect(() => {
        if (needRefreshFriends) { getAllFriendsAction(dispatch, data) }
    }, [needRefreshFriends]);
    console.log(friendsList);

    const handleAddFriend = (userId: number) => {
        const friend = {
            user_src: Number(data),
            user_dest: userId,
            invite_at: new Date().toISOString(),
            confirm_at: null,
            active: false
        }
        console.log(friend);
        createNewFriendRequestAction(dispatch, friend);
        setButtonText('Request Sent');
        setBtnColor('bg-stone-500')
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
        <div className="flex flex-col items-center justify-center h-screen bg-[url('./assets/images/bg.jpeg')] bg-cover w-full">
            <div className="flex items-start justify-around w-2/3 shadow-xl p-5 rounded-md flex z-50 bg-white">
                <div className="border-r w-full">
                    <h2 className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2 text-center mb-5">UserList</h2>
                    <div>
                        {usersList.map((user: UsersDetails, index) => {
                            return (

                                <div className="flex items-center justify-around mb-3" key={index}>
                                    <div className="flex">
                                        <p className="mr-2">{user.firstName}</p>
                                        <p>{user.lastName}</p>
                                    </div>
                                    <button className={`${btnColor} text-white font-bold py-2 px-4 rounded`} disabled={disable} onClick={() => handleAddFriend(user.id)}>{buttonText}</button>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
                <div className="w-full">
                    <h2 className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2 text-center mb-5">Friend Request</h2>
                    <div>
                        {friendsList.map((friend: FriendsDetails, index) => {
                            return (
                                <div className="flex items-center justify-around mb-3" key={index}>
                                    <div className="flex">
                                        <p className="mr-2">{friend.send.firstName}</p>
                                        <p>{friend.send.lastName}</p>
                                    </div>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={disable} onClick={() => handleAccept(friend.id)}>Accept</button>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FriendPage;

