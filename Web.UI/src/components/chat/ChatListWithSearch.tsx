import ChatList from "./ChatList";
import ChatSearch from "./ChatSearch";

const ChatListWithSearch = ({children}:any) => {
  return (
      <>
        <div className="border-r border-gray-300 lg:col-span-1">
            <ChatSearch />
            <ChatList />
        </div>
          <div className="hidden lg:col-span-2 lg:block">
            {children}
          </div>
      </>
  );
}

export default ChatListWithSearch;