import { CheckIcon, UserAddIcon } from "@heroicons/react/outline"
import React, { Fragment } from "react"
import { useLocation } from "react-router-dom"
import { acceptFriendRequest, checkIfRequestIsSent, getFriendsRequests, getMyFriends, refuseFriendRequest } from "../api/friends.axios"
import { getAllUserExceptUserAction } from "../utils/context/actions/admin"
import { createNewFriendRequestAction } from "../utils/context/actions/friends"
import { UsersDetails } from "../utils/context/reducers/admin"
import { useStoreContext } from "../utils/context/StoreContext"
import { Avatar } from "./Avatar"
import { useModalContext } from "./modal"

const UserCard = ({ user, toAdd, action, added }: { user: UsersDetails, toAdd?: boolean, action?: Function, added?: number }) => {
    const [friendsRequests, setFriendsRequests] = React.useState<any[]>([{
        id: 0,
    }])

    React.useEffect(() => {
        added && checkIfRequestIsSent(added).then(res => {
            setFriendsRequests(res.map((friend: any) => {
                return {
                    id: friend.receive.id,
                }
            }))
        })
    }, [added])

    return (
        <div className="h-16 items-center p-2 my-4 bg-slate-50 shadow-lg hover:shadow-xl w-full flex flex-row justify-between rounded-xl pointer">
            <div className="flex justify-start w-3/4 items-center">
                <Avatar initial={user.firstName + ' ' + user.lastName} />
                <span className="ml-2">{user.firstName + ' ' + user.lastName}</span>
            </div>
            {toAdd ? (
                <div onClick={() => action!()}>
                    {friendsRequests.find((friend: { id: number }) => friend.id === user.id) ? (
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    ) : (
                        <UserAddIcon className="h-5 w-5 hover:cursor-pointer mr-2 hover:text-blue-500 text-blue-400" />
                    )}
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
    const location = useLocation()
    const { openModal, updateModalContent, updateModalTitle, closeModal } = useModalContext()
    const [myFriends, setMyFriends] = React.useState<any[]>([{
        id: '',
        firstName: '',
        lastName: '',
    }])
    const [myRequests, setMyRequests] = React.useState<any[]>([])

    React.useEffect(() => {
        if (needRefreshUsers) { getAllUserExceptUserAction(dispatch, id) }
    }, [needRefreshUsers])

    React.useEffect(() => {
        if (location.pathname === '/chat') {
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
        }
    }, [id, location.pathname])

    React.useEffect(() => {
        if (location.pathname === '/chat') {
            getFriendsRequests(id).then(res => {
                setMyRequests(res.map((friend: any) => {
                    return {
                        id: friend.send.id,
                        firstName: friend.send.firstName,
                        lastName: friend.send.lastName,
                    }
                }))
            })
        }
    }, [id, location.pathname])

    const handleAddFriend = async (userId: number) => {
        const friend = {
            user_src: id,
            user_dest: userId,
            invite_at: new Date().toISOString(),
            confirm_at: null,
            active: false
        }
        await createNewFriendRequestAction(dispatch, friend);
    }

    const handleAcceptFriend = () => {
        updateModalTitle('Mes demandes d\'amis')
        updateModalContent(
            <Fragment>
                {myRequests.map((friend: any) => {
                    return (
                        <div className="h-16 items-center p-2 mt-1 bg-slate-50 shadow-lg hover:shadow-xl w-full flex flex-row justify-between rounded-xl">
                            <span>{friend.firstName + ' ' + friend.lastName}</span>
                            <div className="flex">
                                <div className="bg-green-400 hover:bg-green-500 hover:cursor-pointer text-white font-bold py-2 px-4 rounded-full" onClick={() => handleAcceptFriendRequest(friend.id)}>
                                    Accepter
                                </div>
                                <div className="bg-red-400 hover:bg-red-500 hover:cursor-pointer text-white font-bold py-2 px-4 rounded-full" onClick={() => handleRefuseFriendRequest(friend.id)}>
                                    Refuser
                                </div>
                            </div>
                        </div>
                    )
                })}
            </Fragment>
        )
        openModal()
    }

    const handleAcceptFriendRequest = async (userSource: number) => {
        await acceptFriendRequest(userSource, id)
        closeModal()
    }

    const handleRefuseFriendRequest = async (userSource: number) => {
        await refuseFriendRequest(userSource, id)
        closeModal()
    }

    return (
        <div className="flex flex-col h-screen w-full p-2 border rounded-md">
            <div className="h-20">
                <h1 className="font-bold underline">Mes demandes</h1>
                {
                    myRequests.length === 0 ? (
                        <div className="items-center p-2 mt-1 bg-slate-50 shadow-lg hover:shadow-xl w-full flex flex-row justify-between rounded-xl">
                            Aucune demande
                        </div>
                    ) : (
                        <div className="items-center p-2 mt-1 bg-green-500 text-white shadow-lg hover:shadow-xl w-full flex flex-row justify-between rounded-xl hover:cursor-pointer" onClick={handleAcceptFriend}>
                            {`Vous avez ${myRequests.length} demande(s)`}
                        </div>
                    )
                }
            </div>
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
                            <UserCard user={friend} toAdd action={() => handleAddFriend(friend.id)} key={index} added={id} />
                        )
                    })
                    }
                </div>
            </div>
        </div>
    )
}