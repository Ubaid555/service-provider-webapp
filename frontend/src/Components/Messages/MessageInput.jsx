import React from 'react'

const MessageInput = () => {
  return (
    <form>
    <div>
        <input type='text' placeholder='Send a message' />
        <button type='submit'>Send</button>
    </div>
    </form>
  )
}

export default MessageInput