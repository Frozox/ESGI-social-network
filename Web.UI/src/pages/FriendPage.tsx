import React from 'react';
import { getAllFriendsAction } from '../utils/context/actions/friends';
import { getMyUserAction } from '../utils/context/actions/users';
import { FriendsDetails } from '../utils/context/reducers/friends';
import { useStoreContext } from "../utils/context/StoreContext";

const FriendPage = () => {
    const { dispatch, state: { friends: { friendsList, needRefreshFriends }, user: { id } } } = useStoreContext();
    React.useEffect(() => {
        if (needRefreshFriends) { getAllFriendsAction(dispatch)}
    }, [needRefreshFriends]);

    React.useEffect(() => {
        if(id === 0) getMyUserAction(dispatch);
        console.log(id);
    }, [id]);
    
    return (
        <div className='w-full h-screen'>
            <h1>FriendPage</h1>
            <div>
                {friendsList.map((data: FriendsDetails, index) => {
                    return (
                    
                    <div key={index}>
                        <p>{data.firstName}</p>
                        <p>{data.lastName}</p>
                    </div>
                )}
                )}
            </div>
        </div>
    )
}

export default FriendPage;