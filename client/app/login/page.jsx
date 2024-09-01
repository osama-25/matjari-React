"use client";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useState } from 'react';




export default function LoginPage() {



    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLoginPage(event) {
        event.preventDefault();
        console.log(email, password);

        try {
            await axios.post("http://localhost:8080/auth/login", {
                email: email,
                password: password
            });
        } catch (err) {
            console.log("ERROR with /auth/login ", err);

        }
    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">

            <Form className='container col-4 ' onSubmit={handleLoginPage}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        name='email'
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name='password'
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}