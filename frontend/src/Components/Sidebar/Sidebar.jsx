import React from 'react'
import Conversations from './Conversations'
import SearchInput from './SearchInput'

const Sidebar = () => {
  return (
    <div>
        <SearchInput />
        <div></div>
        <Conversations />
    </div>
  )
}

export default Sidebar