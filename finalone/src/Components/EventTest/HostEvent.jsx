import React from 'react'
import { Link } from 'react-router-dom'
const HostEvent = () => {
  return (
    <div>
      <Link to="/EventForm"><button className='bg-gray-600 rounded-2xl text-white font-bold py-4 px-6'>Host an Event</button></Link>
    </div>
  )
}

export default HostEvent
