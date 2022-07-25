import ChatBoxMessageList from "./ChatBoxMessageList";
import ChatBoxHeader from "./ChatBoxHeader";
import React from "react";
import { useStoreContext } from "../../utils/context/StoreContext";
import { getMessages, sendMessage } from "../../api/messages.axios";
import { getUserById } from "../../api/users.axios";
import { getMyUserActions } from "../../utils/context/actions/user";
import { PaperAirplaneIcon } from "@heroicons/react/solid";

const ChatBoxWriteBar = ({ svg, action }: { svg: JSX.Element, action: Function }) => {
  return (
    <div onClick={() => action()}>
      {svg}
    </div>
  )
}

const ChatBox = ({ userDestId }: { userDestId: number }) => {
  const [messages, setMessages] = React.useState<any[]>([]);
  const [myMessage, setMyMessage] = React.useState("");
  const [userDest, setUserDest] = React.useState({
    id: userDestId,
    firstName: 'Utilisateur Inconnu',
    lastName: '',
  });
  const sendMessageEvent = (message: string) => {
    sendMessage(message, userDestId, Number(id)).then(res => {
      setMessages([...messages, res]);
    });
    setMyMessage("");
  }

  React.useEffect(() => {
    getMessages(Number(id), userDestId).then(res => {
      if (!res.data) {
        setMessages(res);
      }
    });
  }, [userDestId, messages.length]);

  React.useEffect(() => {
    getUserById(userDestId).then(res => {
      if (res.id && res.id > 0 && res.firstName && res.lastName) {
        setUserDest({
          id: res.id,
          firstName: res.firstName,
          lastName: res.lastName,
        });
      }
    });
  }, [userDestId]);

  const id = localStorage.getItem("myUser");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMyMessage(e.target.value);
  }

  return (
    <div className="w-full">

      <ChatBoxHeader
        user={userDest}
      />

      <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
        <ChatBoxMessageList
          messages={messages}
        />
      </div>

      <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
        <input type="text" placeholder="Message"
          className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
          name="message" required value={myMessage} onChange={handleChange} />
        <ChatBoxWriteBar svg={<PaperAirplaneIcon className="h-5 w-5 text-gray-500" />} action={() => sendMessageEvent(myMessage)} />
      </div>
    </div>
  );
}

export default ChatBox;