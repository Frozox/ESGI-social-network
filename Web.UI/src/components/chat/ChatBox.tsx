import ChatBoxMessageList from "./ChatBoxMessageList";
import ChatBoxHeader from "./ChatBoxHeader";
import {
  AnnotationIcon,
  EmojiHappyIcon,
  LinkIcon,
  MicrophoneIcon,
} from "@heroicons/react/outline";
import React from "react";
import {useStoreContext} from "../../utils/context/StoreContext";
import {getMessages} from "../../api/messages";
import {getUserById} from "../../api/users.axios";

const ChatBoxWriteBar = ({ svg, type }: { svg: JSX.Element, type?: string }) => {
  return (
    <button type={type ? 'button' : 'submit'}>
      {svg}
    </button>
  )
}

const ChatBox = ({userDestId}: { userDestId: number }) => {

  const [messages, setMessages] = React.useState<any[]>([]);
  const {state: {myUser: {id}}} = useStoreContext();
  React.useEffect(() => {
    getMessages(id, 2).then(res => {
      console.log(res);
      setMessages(res);
    });
  },[id]);

  const [userDest, setUserDest] = React.useState({
    id: userDestId,
    firstName: '',
    lastName: '',
  });
  React.useEffect(() => {
    getUserById(userDestId).then(res => {
      setUserDest({
        id: res.id,
        firstName: res.firstName,
        lastName: res.lastName,
      });
    });
  },[userDestId]);

  console.log(userDest);

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
        <ChatBoxWriteBar svg={<EmojiHappyIcon className="h-5 w-5 text-gray-500" />} />
        <ChatBoxWriteBar svg={<LinkIcon className="h-5 w-5 text-gray-500" />} />
        <input type="text" placeholder="Message"
          className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
          name="message" required />
        <ChatBoxWriteBar svg={<MicrophoneIcon className="h-5 w-5 text-gray-500" />} />
        <ChatBoxWriteBar svg={<AnnotationIcon className="h-5 w-5 text-gray-500" />} type="submit" />
      </div>
    </div>
  );
}

export default ChatBox;