interface ChatListItemProps {
  id: string;
  lastMessage: string;
  created_at: string;
  userDest: {
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
}

const ChatListItem = ({ id, lastMessage, created_at, userDest }: ChatListItemProps) => {
  const final_created_at = new Date(created_at).toDateString();
  return (
    <div
      className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-300 focus:outline-none rounded-md border-none">
      <img className="object-cover w-10 h-10 rounded-full"
        src={userDest.profilePicture}
        alt="username" />
      <div className="w-full pb-2">
        <div className="flex justify-between">
          <span className="block ml-2 font-semibold text-gray-600">{userDest.firstName} {userDest.lastName}</span>
          <span className="block ml-2 text-sm text-gray-600">25 minutes</span>
        </div>
        <span className="block ml-2 text-sm text-gray-600">{lastMessage}</span>
      </div>
    </div>
  );
}

export default ChatListItem;