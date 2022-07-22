import { CheckIcon, UserAddIcon } from "@heroicons/react/outline"
import React from "react"
import { getMyFriends } from "../api/friends.axios"
import { getAllUserExceptUserAction } from "../utils/context/actions/admin"
import { createNewFriendRequestAction, getAllFriendsAction } from "../utils/context/actions/friends"
import { UsersDetails } from "../utils/context/reducers/admin"
import { useStoreContext } from "../utils/context/StoreContext"
import { Avatar } from "./Avatar"

const UserCard = ({ user, toAdd, action, added }: { user: any, toAdd?: boolean, action?: Function, added?: boolean }) => {
    return (
        <div className="h-16 items-center p-2 my-4 bg-slate-50 shadow-lg hover:shadow-xl w-full flex flex-row justify-between rounded-xl pointer">
            <div className="flex justify-between w-3/4 items-center">
                <Avatar initial={user.firstName + ' ' + user.lastName} />
                <span>{user.firstName + ' ' + user.lastName}</span>
            </div>
            {toAdd ? (
                <div onClick={() => action!()}>
                    {added ?
                        <CheckIcon className="h-5 w-5 text-green-500" /> :
                        <UserAddIcon className="h-5 w-5 hover:cursor-pointer mr-2 hover:text-blue-500 text-blue-400" />
                    }
                </div>
            ) : (
                ''
            )}
        </div>
    )
}

export const FriendList = () => {
    const { dispatch, state: {
        myUser: { id },
        users: { usersList, needRefreshUsers }
    } } = useStoreContext()

    React.useEffect(() => {
        if (needRefreshUsers) { getAllUserExceptUserAction(dispatch, id) }
    }, [needRefreshUsers])

    const [myFriends, setMyFriends] = React.useState<any[]>([{
        id: '',
        firstName: '',
        lastName: '',
    }])

    React.useEffect(() => {
        getMyFriends(id).then(res => {
            setMyFriends(
                res.map((friend: any) => {
                    if (friend.send.id !== id) {
                        return {
                            id: friend.send.id,
                            firstName: friend.send.firstName,
                            lastName: friend.send.lastName,
                        }
                    } else if (friend.receive.id !== id) {
                        return {
                            id: friend.receive.id,
                            firstName: friend.receive.firstName,
                            lastName: friend.receive.lastName,
                        }
                    }
                })
            )
        })
    }, [id])

    const handleAddFriend = (userId: number) => {
        const friend = {
            user_src: id,
            user_dest: userId,
            invite_at: new Date().toISOString(),
            confirm_at: null,
            active: false
        }
        createNewFriendRequestAction(dispatch, friend);
    }

    return (
        <div className="flex flex-col h-screen w-full p-2 border rounded-md">
            <div className="flex flex-col w-full h-1/2 overflow-scroll">
                <h1 className="font-bold underline">Mes amis</h1>
                <div>
                    {myFriends.map((friend: any, index) => {
                        return (
                            <UserCard user={friend} key={index} />
                        )
                    })}
                </div>
            </div>
            <div className="flex flex-col w-full h-1/2 overflow-scroll">
                <h1 className="font-bold underline">Utilisateurs</h1>
                <div>
                    {usersList.filter((user: UsersDetails) => {
                        return !myFriends.some((friend: any) => {
                            return friend.id === user.id
                        }) && user.id !== id
                    }).map((friend: any, index) => {
                        return (
                            <UserCard user={friend} toAdd action={() => handleAddFriend(friend.id)} key={index} />
                        )
                    })
                    }
                </div>
            </div>
        </div>
    )
}

// {usersList.filter((user: UsersDetails) => {
//     return !friendsList.find((friend: FriendsDetails) => {
//         return friend.active
//     })
// }).map((user: any, index) => {
//     return (
//         <UserCard user={user} toAdd action={() => handleAddFriend(user.id)} key={index} added={
//             friendsList.find((friend: any) => {
//                 return friend.user_dest === user.id
//             })
//         } />
//     )
// })}