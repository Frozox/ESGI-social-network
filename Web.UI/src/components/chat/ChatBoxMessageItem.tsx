const ChatBoxMessageItem = (props) => {
  const { message } = props;
  const { id, content, created_at, userDest, userSrc, explicit, sentAt, receivedAt, updatedAt, deletedAt } = message;
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

  /*
  if (message.userDest.id === user.id) {
    return messageDest();
  }*/
  return messageSrc();
}

export default ChatBoxMessageItem;