import {Avatar} from "../Avatar";
import {RefreshIcon} from "@heroicons/react/solid";

interface BoxHeaderProps {
  user: {
      id: number,
      firstName: string,
      lastName: string
  };
}

const ChatBoxHeader = ({ user } : BoxHeaderProps) => {
  return (
    <div className="relative flex items-center p-3 border-b border-gray-300">
      <Avatar initial={user.firstName+" "+user.lastName} />
      <span className="block ml-2 font-bold text-gray-600">{user.firstName}</span>
      <RefreshIcon className="w-5 h-5 cursor-pointer"/>
    </div>
  );
}

export default ChatBoxHeader;