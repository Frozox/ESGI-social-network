import {useStoreContext} from "../../utils/context/StoreContext";
import {userIS} from "../../utils/context/reducers/user";


const ChatBoxMessageItem = (props: any) => {
  const { message } = props;
  const { id, content, created_at, userDest, userSrc, explicit, sentAt, receivedAt, updatedAt, deletedAt } = message;

  const { state: { myUser: { id: userId } } } = useStoreContext();

  const messageDest = () => {
    return (
      <li className="flex justify-start" id={"message_"+id}>
        <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
          <span className="block">{message.content}</span>
        </div>
      </li>
    );
  }
  const messageSrc = () => {
    return (
      <li className="flex justify-end" id={"message_"+id}>
        <div
          className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
          <span className="block">{message.content}</span>
        </div>
      </li>
    );
  }
  console.log(userDest, userId);
  if (userSrc === userId) {
    return messageDest();
  }
  return messageSrc();
}

export default ChatBoxMessageItem;