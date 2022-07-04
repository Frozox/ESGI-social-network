import ChatBoxMessageItem from "./ChatBoxMessageItem";

interface ChatBoxMessageListProps {
  messages: Array<any>;
}

const ChatBoxMessageList = ({ messages }: ChatBoxMessageListProps) => {
  return (
    <ul className="space-y-2">
      {messages.map((message, index) => {
        message.id = index;
        return (
          <ChatBoxMessageItem
            key={message.id}
            message={message}
          />
        )
      }
      )}
    </ul>
  );
}

export default ChatBoxMessageList;