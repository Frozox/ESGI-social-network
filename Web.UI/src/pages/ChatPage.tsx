import ChatListWithSearch from "../components/chat/ChatListWithSearch";
import ChatBox from "../components/chat/ChatBox";
import { FriendList } from "../components/FriendList";
import { useStoreContext } from "../utils/context/StoreContext";
import React from "react";
import { authLogoutRequest } from "../utils/context/actions/auth";
import {useNavigate, useParams} from "react-router-dom";
import {getMyUserActions} from "../utils/context/actions/user";

const ChatPage = () => {
    const { dispatch } = useStoreContext();
    const navigate = useNavigate();
    React.useEffect(() => {
        getMyUserActions(dispatch);
    },[]);
    const handleLogout = () => {
        localStorage.removeItem("token")
        authLogoutRequest(dispatch, navigate)
    }
    const params = useParams();


    return (
        <div className="w-full h-screen flex p-1">
            <div className="w-1/12 border rounded-md">
                <h1>Je suis la navbar</h1>
                <div onClick={handleLogout}>Deconnexion</div>
            </div>
            <div className="border rounded lg:grid lg:grid-cols-3 w-9/12 mx-1">
                <ChatListWithSearch>
                    {params.id && <ChatBox userDestId={Number(params.id)} />}
                </ChatListWithSearch>
            </div>
            <div className="w-2/12">
                <FriendList />
            </div>
        </div>
    );
}

export default ChatPage;