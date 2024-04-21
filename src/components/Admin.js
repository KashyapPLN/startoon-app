import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Form, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
    const [loginInfo, setLoginInfo] = useState(null);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showTable, setShowTable] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
      const fetchLoginInfo = async () => {
        try {
          const response = await axios.get('http://localhost:4000/user/loginInfo');
          setLoginInfo(response.data);
        } catch (error) {
          setError(error);
        }
      };
  
      fetchLoginInfo();
    }, []);
  
    const filteredLoginInfo = loginInfo && loginInfo.filter(info => {
      return (
        info.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        info.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const handleNavClick = (tab) => {
      if (tab === 'home') {
        setShowTable(true);
      } else {
        setShowTable(false);
      }
    };
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    if (!loginInfo) {
      return <div>Loading...</div>;
    }

    function handleLogout(){
        localStorage.clear();
        navigate('/login');
    }
  
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand onClick={() => handleNavClick('home')}>Home</Navbar.Brand>
          <Navbar.Brand onClick={() => handleNavClick('graph')}>Graph</Navbar.Brand>
          <Form inline>
            <Form.Control
              type="text"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Form>
          <Nav className="ms-auto me-5">
            <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
          </Nav>
        </Navbar>
  
        {showTable && (
          <Table striped bordered hover className='mt-5'>
            <thead>
              <tr>
                <th>Sl. No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Count</th>
                <th>Login Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoginInfo.map((info, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{info.name}</td>
                  <td>{info.email}</td>
                  <td>{info.count}</td>
                  <td>{info.loginDate}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    );
}
