import React from "react";
import { useLocation } from "react-router-dom";
import { getLastConversations } from "../../api/messages.axios";
import { useStoreContext } from "../../utils/context/StoreContext";
import Dropdown from "../Dropdown";
import ChatList from "./ChatList";
import ChatSearch from "./ChatSearch";

const ChatListWithSearch = ({ children }: any) => {
  const { state: { myUser: { id } } } = useStoreContext();
  const [conversations, setConversations] = React.useState<any[]>([]);
  const [searchValue, setSearchValue] = React.useState('');
  const searchRegex = new RegExp(searchValue, 'i');
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === '/chat') {
      getLastConversations(Number(id)).then((res: any) => {
        res.forEach((conv: any) => {
          const convToDelete = res.findIndex((conv2: any) => findSameConversation(conv, conv2));
          if (convToDelete > -1) {
            res.splice(convToDelete, 1);
          }
        });
        setConversations(res);
      });
    }
  }, [location.pathname, id]);

  const findSameConversation = (conv1: any, conv2: any) => {
    return conv1.userDest === conv2.userSrc && conv1.userSrc === conv2.userDest && conv1.sendAt < conv2.sendAt;
  }

  return (
    <>
      <div className="border-r border-gray-300 lg:col-span-1">
        <ChatSearch value={searchValue} onChange={setSearchValue} />
        <div className="flex justify-end w-full">
          <div className="mr-3">
            <Dropdown />
          </div>
        </div>
        <ChatList conversations={conversations.filter((item: any) => searchRegex.test(item.receiver.firstName) || searchRegex.test(item.sender.firstName))} />
      </div>
      <div className="hidden lg:col-span-2 lg:block">
        {children}
      </div>
    </>
  );
}

export default ChatListWithSearch;