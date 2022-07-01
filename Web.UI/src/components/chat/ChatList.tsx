import ChatListItem from "./ChatListItem";

const ChatList = () => {

  const chats = new Array(20).fill({
    lastMessage: "Bonjour",

    created_at: "2020-01-01",
    userDest: {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      profilePicture: "https://randomuser.me/api/portraits/lego/1.jpg",
    }
  });

  return (
    <ul className="overflow-scroll h-[45rem]">
      <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
      <li className="p-2">
        {chats.map((chat, index) => {
          chat.id = index;
          return (
            <ChatListItem
              key={chat.id}
              id={chat.id}
              lastMessage={chat.lastMessage}
              created_at={chat.created_at}
              userDest={chat.userDest}
            />
          )
        }
        )}
      </li>
    </ul>
  );
}

export default ChatList;