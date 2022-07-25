import {Link} from "react-router-dom";
import {Avatar} from "../Avatar";

interface ChatListItemProps {
  lastMessage: string;
  sendAt: string;
  friend: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

const ChatListItem = ({ lastMessage, sendAt, friend }: ChatListItemProps) => {
  const sendAtDate = new Date(sendAt);
  const currentDate = new Date();
  const diff = currentDate.getTime() - sendAtDate.getTime();
  const diffMinutes = Math.round(((diff % 86400000) % 3600000) / 60000);
  const diffHours = Math.round(diff / 3600000);
  const diffDays = Math.round(diff / 86400000);
  const diffWeeks = Math.round(diff / 604800000);
  const diffMonths = Math.round(diff / 2628000000);
  const diffYears = Math.round(diff / 31536000000);
  let time = "";
  // @ts-ignore
  if (diffMinutes < 60) {
    time = diffMinutes + " minutes";
  }else if (diffHours < 24) {
    time = diffHours + " heures";
  }else if (diffDays < 7) {
    time = diffDays + " jours";
  }else if (diffWeeks < 4) {
    time = diffWeeks + " semaines";
  }else if (diffMonths < 12) {
    time = diffMonths + " mois";
  }else
    time = diffYears + " ans";
  return (
    <Link to={`/chat/${friend.id}`}>
      <div
        className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-300 focus:outline-none rounded-md border-none">
        <Avatar initial={friend.firstName+" "+friend.lastName} />
        <div className="w-full pb-2">
          <div className="flex justify-between">
            <span className="block ml-2 font-semibold text-gray-600">{friend.firstName} {friend.lastName}</span>
            <span className="block ml-2 text-sm text-gray-600">{time}</span>
          </div>
          <span className="block ml-2 text-sm text-gray-600">{lastMessage}</span>
        </div>
      </div>
    </Link>
  );
}

export default ChatListItem;