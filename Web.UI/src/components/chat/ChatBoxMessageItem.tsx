import {useStoreContext} from "../../utils/context/StoreContext";

const ChatBoxMessageItem = (props: any) => {
  const { message } = props;
  const { id, content, created_at, userDest, userSrc, explicit, sentAt, receivedAt, updatedAt, deletedAt } = message;
  const { state: { myUser: { id: userId } } } = useStoreContext();

  const messageRender = (isSentByMe: boolean) => {
    const className = isSentByMe ? "relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow" : "relative max-w-xl px-4 py-2 text-gray-700 rounded shadow";
    const start = isSentByMe ? "flex justify-end" : "flex justify-start";
    return (
      <li className={start} id={"message_"+id}>
        <div className={className}>
          <span className="block">{message.content}</span>
        </div>
      </li>
    );
  }

  return (
    <>
        {messageRender(userSrc === userId)}
    </>
  );
}

export default ChatBoxMessageItem;