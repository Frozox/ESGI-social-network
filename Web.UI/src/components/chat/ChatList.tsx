import ChatListItem from "./ChatListItem";
import React from "react";
import {getLastConversations, getMessages} from "../../api/messages";

const ChatList = () => {
  const [conversations, setConversations] = React.useState<any[]>([]);
  const id = localStorage.getItem("myUser");
  React.useEffect(() => {
    getLastConversations(Number(id)).then(res => {
      if (!res.data) {
        setConversations(res);
      }
    });
  },[conversations.length]);

  console.log(conversations);

  //return (<></>);
  return (
    <ul className="overflow-scroll h-[45rem]">
      <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Conversations</h2>
      <li className="p-2">
        {conversations.filter((conv, index, self) => {
          // prevent duplicates with the same user
          return index === self.findIndex((t) => ( t.userDest === conv.userDest));
        }).map((conversation, index) => {
            if (conversation.userDest === id) {
              return <ChatListItem
                key={index}
                lastMessage={conversation.content}
                sendAt={conversation.sendAt}
                friend={conversation.sender}
              />;
            }else {
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