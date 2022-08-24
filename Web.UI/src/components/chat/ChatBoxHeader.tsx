import {Avatar} from "../Avatar";

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
      <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
    </div>
  );
}

export default ChatBoxHeader;