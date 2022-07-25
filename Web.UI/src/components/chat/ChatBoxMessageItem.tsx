import {useStoreContext} from "../../utils/context/StoreContext";
import {useModalContext} from "../modal";
import {updateMessage} from "../../api/messages";
import React from "react";
import moment from "moment";


const ChatBoxMessageItem = (props: any) => {
  const { message } = props;
  const { id, content, created_at, userDest, userSrc, explicit, sendAt, receivedAt, updatedAt, deletedAt } = message;
  const { state: { myUser: { id: userId } } } = useStoreContext();
  const {yesActionModal ,yesNoModal, openModal, updateModalContent, updateModalTitle} = useModalContext();
  const [modifyMessage, setModifyMessage] = React.useState(message.content);

  const handleEditMessage = (messageId: number) => {
    updateModalTitle("Modifier le message");
    updateModalContent(
      <>
        <label htmlFor="messageInput" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
          Nouveau message</label>
        <textarea id="messageInput" name="messageInput" rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Votre message..."
          value={modifyMessage}
          onChange={(event) => setModifyMessage(event.target.value)}
        />
      </>
    );
    yesActionModal(() => {
      updateMessage(modifyMessage, messageId);
    });
    yesNoModal();
    openModal();
  }

  const messageRender = (isSentByMe: boolean) => {
    const className = isSentByMe ? "relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow hover:bg-gray-300 cursor-pointer" : "relative max-w-xl px-4 py-2 text-gray-700 rounded shadow";
    const start = isSentByMe ? "flex justify-end" : "flex justify-start";
    return (
      <li className={start} id={"message_"+id}>
        <div className={className} onClick={() => {isSentByMe ? handleEditMessage(id) : undefined}}>
          <span className="block">{message.content}</span>
          <span className="font-thin text-sm mr-2">Modifié - {moment(sendAt).format("DD/MM/YYYY")}</span>
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