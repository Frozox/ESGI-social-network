import ChatListWithSearch from "../components/chat/ChatListWithSearch";
import ChatBox from "../components/chat/ChatBox";
import { FriendList } from "../components/FriendList";
import { getMyUserActions } from "../utils/context/actions/user";
import { useStoreContext } from "../utils/context/StoreContext";
import React from "react";

const ChatPage = () => {
    const { dispatch } = useStoreContext()
    React.useEffect(() => {
        getMyUserActions(dispatch)
    }, [])
    return (
        <div className="w-full flex p-1">
            <div className="w-1/12 h-screen border rounded-md">
                <h1>Je suis la navbar</h1>
            </div>
            <div className="border rounded lg:grid lg:grid-cols-3 w-9/12 mx-1">
                <ChatListWithSearch />
                <ChatBox />
            </div>
            <div className="w-2/12">
                <FriendList />
            </div>
        </div>
    );
}

export default ChatPage;