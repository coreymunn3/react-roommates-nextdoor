import React, { useState } from 'react';
import Post from "../post-component/index";

// styling 
import 'bootstrap/dist/css/bootstrap.min.css';

// Bootstrap compponents
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // validate username and password here

    //     // load post component
    //     return (
    //         <Post>        
    //         </Post>
    //     );
        
    //   };

    const handleSubmit = () => {
        // TODO: handle transition from login to post screen
    }

    return( 
    <Container> 
        <Row className="justify-content-md-center">
            <Col xs={12} sm={4} md={4} className = "my-auto"> 
            <Form>
                <Form.Group> 
                    <Form.Text>
                        <h2> React Roommates! </h2>
                    </Form.Text> 
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        />
                </Form.Group>
            
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        />
                </Form.Group>

                <Button 
                    variant="primary" 
                    type="submit"
                    onClick={() => handleSubmit()}
                >
                    Submit
                </Button>
        </Form>
        </Col> 
    </Row>
  </Container>
  );
}

export default Login;