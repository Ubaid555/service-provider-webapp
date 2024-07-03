// import React from 'react';
// import Conversation from './Conversation';
// import useGetConversations from '../../hooks/useGetConversations.js';

// const Conversations = ({ searchQuery }) => {
//   const { loading, conversations } = useGetConversations();

//   // Filter conversations based on search query
//   const filteredConversations = conversations.filter((conversation) =>
//     conversation.fullName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div>
//       {filteredConversations.length === 0 && !loading && (
//         <p>No users found.</p>
//       )}

//       {filteredConversations.map((conversation, idx) => (
//         <Conversation
//           key={conversation._id}
//           conversation={conversation}
//           lastIdx={idx === filteredConversations.length - 1}
//         />
//       ))}

//       {loading && <span>Loading...</span>}
//     </div>
//   );
// };

// export default Conversations;

import React from 'react';
import Conversation from './Conversation';
import useGetConversations from '../../hooks/useGetConversations.js';

const Conversations = ({ searchQuery, onConversationSelect }) => {
  const { loading, conversations } = useGetConversations();
  console.log(conversations);

  // Filter conversations based on search query
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
        <span>No users found</span>
      )}
      {loading && <span>Loading...</span>}
    </div>
  );
};

export default Conversations;

