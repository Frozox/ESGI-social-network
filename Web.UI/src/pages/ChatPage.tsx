import ChatListWithSearch from "../components/chat/ChatListWithSearch";
import ChatBox from "../components/chat/ChatBox";
const ChatPage = () => {

    return (
        <div className="container mx-auto">
            <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
                <ChatListWithSearch />
                <ChatBox />
            </div>
        </div>
    );
}

export default ChatPage;