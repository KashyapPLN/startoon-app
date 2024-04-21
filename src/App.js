import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import Signup from './components/login/Signup';
import Home from './components/Home';
import { useEffect, useState } from 'react';

function App() {
  const navigate = useNavigate();

  const [userType,setUserType]=useState(null);
  const [user,setUser] = useState(null);

  useEffect(()=>{
    if(localStorage.getItem('token')===null){
      navigate('/login');
        }
  },[localStorage.getItem('token')])

  return (
    <div className="App">
     <Routes>
     {localStorage.getItem('token')? <Route path="/" element={<Home userType={userType} user={user}/>}/> : null}
    { localStorage.getItem('token')===null ? <Route path="/login" element={<Login setUserType={setUserType} setUser={setUser}/>}/> : null}
    { localStorage.getItem('token')===null ?   <Route path="/signup" element={<Signup />} />: null}
     </Routes>
    </div>
  );
}

export default App;
