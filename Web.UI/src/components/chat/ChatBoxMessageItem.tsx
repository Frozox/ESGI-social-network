import {useStoreContext} from "../../utils/context/StoreContext";
import {useModalContext} from "../modal";
import {updateMessage} from "../../api/messages.axios";
import React from "react";
import moment from "moment";


const ChatBoxMessageItem = (props: any) => {
  const { message } = props;
  const { id, content, created_at, userDest, userSrc, explicit, sendAt, receivedAt, updatedAt, deletedAt } = message;
  const { state: { myUser: { id: userId } } } = useStoreContext();
  const { closeModal,openModal, updateModalContent, updateModalTitle } = useModalContext();
  const [modifyMessage, setModifyMessage] = React.useState(message.content);

  const updateMessageAction = async (message: string, id:  number) => {
    const result = await updateMessage(message,id);
    closeModal();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModifyMessage(e.target.value);
  }
  const handleEditMessage = (messageId: number) => {
    updateModalTitle("Modifier le message");
    updateModalContent(
      <>
        <label htmlFor="messageInput" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
          Nouveau message</label>
        <input id="messageInput" name="messageInput"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Votre message..."
          defaultValue={modifyMessage}
          onKeyDown={(e) => handleChange(e)}
        />

        <div className="flex justify-end mt-4">
          <button onClick={() => updateMessageAction(modifyMessage, messageId)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Modifier
          </button>
        </div>
      </>
    );
    openModal();
  }

  const messageRender = (isSentByMe: boolean) => {
    let allowAction = true;
    const className = isSentByMe ? "relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow hover:bg-gray-300 cursor-pointer" : "relative max-w-xl px-4 py-2 text-gray-700 rounded shadow";
    const start = isSentByMe ? "flex justify-end" : "flex justify-start";
    if (explicit) {message.content = "Ce message contient des caractères non autorisés"; allowAction = false;}
    if (deletedAt) {message.content = "Ce message a été supprimé"; allowAction = true;}
    return (
      <li className={start} id={"message_" + id}>
        <div className={className} onClick={() => { isSentByMe && allowAction ? handleEditMessage(id) : undefined }}>
          <span className="block">{message.content}</span>
          {updatedAt && <span className="font-thin float-right text-xs text-gray-500">Modifié - {moment(updatedAt).format("HH:mm")}</span>}
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