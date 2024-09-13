"use client";
import { Form, Button, Toast, ToastContainer } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ToastMessage from '../bootstrap-component/toast';

// import checkLogin from './checklogin';
export default function LoginPage() {


    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showToast, setShowToast] = useState(false);

    const handleShowToast = () => setShowToast(true);



    // const checkLogin = async () => {
    //     try {
    //         const token = localStorage.getItem("token");

    //         if (token) {
    //             // Check login status by sending the JWT token in the Authorization header
    //             const res = await axios.post('http://localhost:8080/auth/login', {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`
    //                 }
    //             });

    //             console.log(res);

    //             if (res.status === 200) {
    //                 // User is authenticated, redirect to home or another protected page
    //                 router.push('/home');
    //             }
    //             else
    //                 router.push('/login');
    //         }
    //         else {
    //             router.push('/');
    //         }


    //     } catch (err) {
    //         console.log("Error checking login status:", err);
    //     }
    // };

    // useEffect( () => {
    //     if ( checkLogin('/home')) {
    //         router.push('home');
    //         return;
    //     }
    // }, []);

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => setShowToast(false), 1000);
            return () => clearTimeout(timer); // Cleanup timer on unmount
        }
    }, [showToast]);

    const handleLoginPage = async (event) => {
        event.preventDefault();

        try {
            const res = await axios.post("http://localhost:8080/auth/login", {
                email,
                password
            });

            if (res.data.success) {
                localStorage.setItem("token", res.data.token);

                router.push('/home');
            } else {
                handleShowToast();
            }
        } catch (err) {

            handleShowToast();
            console.log("Error with /auth/login:", err);
        }
    };

    return (
        <>

            <div>
                <ToastMessage text={"User Not Found"} show={showToast} onClose={() => setShowToast(false)} />
            </div>

            <div className="d-flex justify-content-center align-items-center vh-100">
                <Form className='container col-4' onSubmit={handleLoginPage}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            name='email'
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
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
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    );
}
