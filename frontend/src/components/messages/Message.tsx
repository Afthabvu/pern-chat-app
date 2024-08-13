const Message = () => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-6 md:w-10 rounded-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            alt="chat bubble"
          />
        </div>
      </div>
      <p className="chat-bubble text-white bg-blue-500">message</p>
      <span className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white">
        createdAt
      </span>
    </div>
  );
};

export default Message;
