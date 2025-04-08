import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../../query/auth'; // Hook gọi API
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Form.css'

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: ''
    });

    const loginMutation = useRegister();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        loginMutation.mutate(formData, {
            onSuccess: (data) => {
                console.log("Login success response:", data);
                toast.success('Login Successful!', {
                    position: 'top-right',
                    autoClose: 2000
                });
                setTimeout(() => {
                    navigate('/'); // hoặc theo role
                }, 2500);
            },
            onError: (error) => {
                console.error("Login error response:", error.response);
                toast.error(error.response?.data?.message || 'Login failed!', {
                    position: 'top-right',
                    autoClose: 3000
                });
            }
        });
    };

    return (
        <div className="signup">
            <ToastContainer />
            <Container className='form-container d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
                <Row className="w-100">
                    <Col xs={12} sm={10} md={8} lg={6} className="mx-auto">
                        <div className="form-control p-4">
                            <h2 className='text-center'>Register</h2>
                            <Form onSubmit={handleSignup}>


                                <Form.Group className='mb-3'>
                                    <Form.Label className='fw-bold'>Userame</Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='username'
                                        value={formData.username}
                                        onChange={handleChange}
                                        required />
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label className='fw-bold'>Email</Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='email'
                                        value={formData.email}
                                        onChange={handleChange}
                                        required />
                                </Form.Group>

                                <Form.Group className='mb-4'>
                                    <Form.Label className='fw-bold'>Password</Form.Label>
                                    <Form.Control
                                        type='password'
                                        name='password'
                                        value={formData.password}
                                        onChange={handleChange}
                                        required />
                                </Form.Group>

                                <Form.Group className='mb-3 text-center'>
                                    <Button className='w-50' type='submit'>Register</Button>
                                </Form.Group>

                                <Form.Group className='mb-3 text-center'>
                                    <span className='ms-3'>Forgot password?
                                        <a href="/login">Login</a> </span>
                                </Form.Group>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Register
