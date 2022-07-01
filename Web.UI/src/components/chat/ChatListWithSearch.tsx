import ChatList from "./ChatList";
import ChatSearch from "./ChatSearch";

const ChatListWithSearch = () => {
  return (
    <div className="border-r border-gray-300 lg:col-span-1">
      <ChatSearch />
      <ChatList />
    </div>
  );
}

export default ChatListWithSearch;