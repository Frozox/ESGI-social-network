import ChatBoxMessageList from "./ChatBoxMessageList";
import ChatBoxHeader from "./ChatBoxHeader";
import {
  AnnotationIcon,
  EmojiHappyIcon,
  LinkIcon,
  MicrophoneIcon,
} from "@heroicons/react/outline";
import axios from "axios";

const ChatBoxWriteBar = ({ svg, type }: { svg: JSX.Element, type?: string }) => {
  return (
    <button type={type ? 'button' : 'submit'}>
      {svg}
    </button>
  )
}

const getMessages = () => {
  return axios.get("http://localhost:3000/getMessages")
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err);
      })
    ;
}

const ChatBox = () => {
  const messages = new Array(100).fill({
    content: "Bonjour",
    created_at: "2020-01-01",
    userDest: {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      profilePicture: "https://randomuser.me/api/portraits/lego/1.jpg",
    },
    userSrc: {
      id: 2,
      firstName: "Jane",
      lastName: "Doe",
      profilePicture: "https://randomuser.me/api/portraits/lego/2.jpg",
    },
    explicit: false,
    sentAt: "2020-01-01",
    receivedAt: "2020-01-01",
    updatedAt: null,
    deletedAt: null,
  });

  return (
    <div className="hidden lg:col-span-2 lg:block">
      <div className="w-full">

        <ChatBoxHeader
          user={messages[0].userDest}
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
    </div>
  );
}

export default ChatBox;