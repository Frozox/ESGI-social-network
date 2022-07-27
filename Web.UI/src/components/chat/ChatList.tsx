import ChatListItem from "./ChatListItem";
import React from "react";
import { getLastConversations, getMessages } from "../../api/messages.axios";
import { useStoreContext } from "../../utils/context/StoreContext";

const ChatList = ({ conversations }: any) => {
  const { state: { myUser: { id } } } = useStoreContext()
  return (
    <ul className="overflow-scroll h-[45rem]">
      <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Conversations</h2>
      <li className="p-2">
        {conversations.map((conversation: { userDest: any; content: string; sendAt: string; sender: { id: number; firstName: string; lastName: string; }; receiver: { id: number; firstName: string; lastName: string; }; }, index: React.Key | null | undefined) => {
          if (conversation.userDest == id) {
            return <ChatListItem
              key={index}
              lastMessage={conversation.content}
              sendAt={conversation.sendAt}
              friend={conversation.sender}
            />;
          } else {
            return <ChatListItem
              key={index}
              lastMessage={conversation.content}
              sendAt={conversation.sendAt}
              friend={conversation.receiver}
            />;
          }
        }
        )}
      </li>
    </ul>
  );
}

export default ChatList;