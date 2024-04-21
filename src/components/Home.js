import React from 'react'
import User from './User'
import Admin from './Admin'

export default function Home({userType,user}) {
  return (
    <div>
      {userType!=='admin'? <User user={user}/> :
       <Admin/>}
     
    </div>
  )
}
