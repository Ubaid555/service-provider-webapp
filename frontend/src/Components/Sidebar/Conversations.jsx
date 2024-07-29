import React, { useEffect, useState } from "react";
import styles from "./Conversation.module.css";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations.js";
import io from 'socket.io-client';

const socket = io('http://localhost:5001');

const Conversations = ({ searchQuery, onConversationSelect }) => {
  const [triggerFetch, setTriggerFetch] = useState(false);
  const { loading, conversations } = useGetConversations(triggerFetch);
  // console.log("Conversations", conversations);

  const filteredConversations = conversations.filter((conversation) =>
    conversation.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loginusers"))._id;
    console.log(storedUser);
    socket.on('receiveMessage', (message) => {
      setTriggerFetch(prev => !prev);  
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  return (
    <div>
      {filteredConversations.length > 0 ? (
        filteredConversations.map((conversation, idx) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            lastIdx={idx === filteredConversations.length - 1}
            onClick={() => onConversationSelect(conversation)}
          />
        ))
      ) : (
        <span className={styles.noUsersFound}>No users found</span>
      )}
      {loading && <span>Loading...</span>}
    </div>
  );
};

export default Conversations;