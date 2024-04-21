import React from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function User({user}) {
    const navigate = useNavigate();
    function handleLogout(){
        localStorage.clear();
  navigate('/login');
    }
  return (
    <div className='mt-3'>
        <div className='me-5'style={{display:'flex',justifyContent:'flex-end'}}>
        <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
        </div>
       { user && <h1 className='mt-5 ms-5'> Hello {user.name}!</h1>}
       { user &&  <div className='mt-5' >
        <p className='ms-5'><span className='me-2'style={{fontWeight:600}}>Name :</span><span>{user.name}</span></p>
        <p className='ms-5'><span className='me-2'style={{fontWeight:600}}>Gender :</span><span>{user.gender}</span></p>
        <p className='ms-5'> <span className='me-2'style={{fontWeight:600}}>Email :</span><span>{user.email}</span></p>
       </div>}
    </div>
  )
}
