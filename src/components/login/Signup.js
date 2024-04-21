import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import './login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [gender, setGender] = useState('');
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      // Perform signup logic here
      console.log('Signup clicked');
      try {
        // Send POST request to signup endpoint
        const response = await axios.post('http://localhost:4000/user/signup', { name,email, password, gender });

        // Handle success
        console.log('Signup successful:', response.data);
        // Redirect to login page after successful signup
        navigate('/login');
      } catch (error) {
        // Handle error
        console.error('Signup failed:', error.response);
        setError(error.response);
      }
    }
    setValidated(true);
  };

  return (
    <div className='signup-page'>
      <Container>
        <h2>Sign Up</h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName" className='mt-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">Please enter your name.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicEmail" className='mt-3'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className='mt-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
            <Form.Control.Feedback type="invalid">Password must be at least 6 characters.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formConfirmPassword" className='mt-3'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmedPassword}
              onChange={(e) => setConfirmedPassword(e.target.value)}
              minLength={6}
              required
            />
            <Form.Control.Feedback type="invalid">Passwords must match.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formGender" className='mt-3'>
          <div style={{display:'flex',flexDirection:'row',gap:'2%'}}>
            <Form.Label>Gender: </Form.Label>
            
            <Form.Check
              type="radio"
              label="Male"
              name="gender"
              value="male"
              onChange={(e) => setGender(e.target.value)}
              required
            />
            <Form.Check
              type="radio"
              label="Female"
              name="gender"
              value="female"
              onChange={(e) => setGender(e.target.value)}
              required
            />
            </div>
            <Form.Control.Feedback type="invalid">Please select your gender.</Form.Control.Feedback>
          </Form.Group>

          {error && <Alert variant="danger">{error}</Alert>}

          <Button className='mt-3' variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
        <Button className='mt-3' variant='text' style={{ padding: 0, color: '#0d6efd' }} onClick={(e) => navigate('/login')}>Already have an account? Please login</Button>
      </Container>

    </div>
  );
};

export default Signup;
