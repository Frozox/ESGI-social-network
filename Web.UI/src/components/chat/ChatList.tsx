import ChatListItem from "./ChatListItem";
import React from "react";
import { getLastConversations, getMessages } from "../../api/messages.axios";

const ChatList = () => {
  const [conversations, setConversations] = React.useState<any[]>([]);
  const id = localStorage.getItem("myUser");
  React.useEffect(() => {
    getLastConversations(Number(id)).then((res: any) => {
      if (!res.data) {
        res.forEach((conv: any) => {
          const convToDelete = res.findIndex((conv2: any) => findSameConversation(conv, conv2));
          if (convToDelete > -1) {
            res.splice(convToDelete, 1);
          }
        });
        setConversations(res);
      }
    });
  }, [conversations.length]);

  const findSameConversation = (conv1: any, conv2: any) => {
    return conv1.userDest === conv2.userSrc && conv1.userSrc === conv2.userDest && conv1.sendAt < conv2.sendAt;
  }

  //return (<></>);
  return (
    <ul className="overflow-scroll h-[45rem]">
      <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Conversations</h2>
      <li className="p-2">
        {conversations.map((conversation, index) => {
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