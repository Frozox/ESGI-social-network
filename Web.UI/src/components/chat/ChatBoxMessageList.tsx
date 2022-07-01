import ChatBoxMessageItem from "./ChatBoxMessageItem";

const ChatBoxMessageList = (props) => {
  const { messages } = props;
  return (
    <ul className="space-y-2">
      {messages.map((message, index) => {
        message.id = index;
        return (
          <ChatBoxMessageItem
            key={message.id}
            message={message}
          />
        )}
      )}
    </ul>
  );
}

export default ChatBoxMessageList;