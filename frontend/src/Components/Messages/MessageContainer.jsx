import React from 'react'
import MessageInput from './MessageInput'
import Messages from './Messages'

const MessageContainer = () => {
  return (
    <div>
        <>
            <div>
                <span>To : </span>
                <span>Hanzala Javaid</span>
            </div>

            <Messages />
            <MessageInput />
        </>
    </div>
  )
}

export default MessageContainer