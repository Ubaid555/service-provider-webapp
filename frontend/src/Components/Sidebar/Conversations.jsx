import React from "react";
import styles from "./Conversation.module.css";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations.js";

const Conversations = ({ searchQuery, onConversationSelect }) => {
  const { loading, conversations } = useGetConversations();
  // console.log(conversations);

  const filteredConversations = conversations.filter((conversation) =>
    conversation.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
