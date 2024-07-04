import React from 'react';
import Message from './Message';

const Messages = ({ messages }) => {
  return (
    <div>
      {messages.map((msg, i) => (
        <Message key={i} message={msg.content} senderId={msg.senderId} />
      ))}
    </div>
  );
};

export default Messages;
