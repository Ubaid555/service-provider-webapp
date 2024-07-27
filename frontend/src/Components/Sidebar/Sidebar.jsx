import React, { useState } from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import MessageContainer from "../Messages/MessageContainer";

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] = useState(null);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleBackClick = () => {
    setSelectedConversation(null);
  };

  return (
    <div>
      {selectedConversation ? (
        <MessageContainer
          conversation={selectedConversation}
          onBackClick={handleBackClick}
        />
      ) : (
        <>
          <SearchInput handleSearchInputChange={handleSearchInputChange} />
          <Conversations
            searchQuery={searchQuery}
            onConversationSelect={handleConversationSelect}
          />
        </>
      )}
    </div>
  );
};

export default Sidebar;
