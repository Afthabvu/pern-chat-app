import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }: { message: MessageType }) => {
  const { authUser } = useAuthContext(); //the person who is signed in
  const { selectedConversation } = useConversation(); //the users who is there in db
  const fromMe = message?.senderId === authUser?.id; //checks if the particular message is send by the authenticated user
  const img = fromMe ? authUser?.profilePic : selectedConversation?.profilePic; //checks the meesage from which person and set their profilePic
  const chatClass = fromMe ? "chat-end" : "chat-start";
  const bubbleBg = fromMe ? "bg-blue-500" : "";
  const shakeClass=message.shouldShake?'shake':''
  return (
    <div className={`chat ${chatClass}`}>
      <div className="chat-image avatar">
        <div className="w-6 md:w-10 rounded-full">
          <img
            src={img}
            alt="chat bubble"
          />
        </div>
      </div>
      <p className={`chat-bubble text-white ${bubbleBg} ${shakeClass} text-sm md:text-md`}>{message.body}</p>
      <span className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white">
        {extractTime(message.createdAt)}
      </span>
    </div>
  );
};

export default Message;
