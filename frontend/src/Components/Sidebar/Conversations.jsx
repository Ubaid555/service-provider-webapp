import React from 'react'
import Conversation from './Conversation'

import useGetConversations from "../../hooks/useGetConversations.js";

const Conversations = () => {
  const {loading , conversations} = useGetConversations();
  console.log(conversations);
  return (
    <div>
     {/* <Conversation /> */}
        {conversations.map((conversation,idx) =>(
          <Conversation 
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === conversations.length -1}
          />
        ))}

        {loading ? <span></span> : null}
       
        {/* <Conversation /> */}

    </div>
  )
}

export default Conversations