import React from 'react';
import { getAllUserAction } from '../utils/context/actions/admin';
import { UsersDetails } from '../utils/context/reducers/admin';
import { useStoreContext } from "../utils/context/StoreContext";

const FriendPage = () => {
    const { dispatch, state: { users: { usersList, needRefreshUsers } } } = useStoreContext();
    React.useEffect(() => {
        if (needRefreshUsers) getAllUserAction(dispatch);
    }, [needRefreshUsers]);

    return (
        <div>
            <h1>FriendPage</h1>
            <ul>
                {usersList.map((data: UsersDetails, index) => {
                    return <li key={index}>{data.firstName}<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Je t'aimeuh</button></li>
                }
                )}
            </ul>
        </div>
    )
}

export default FriendPage;