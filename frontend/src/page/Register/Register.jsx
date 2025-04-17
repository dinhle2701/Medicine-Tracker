import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../../query/auth'; // Hook gọi API
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Form.css'
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: ''
    });
    const [formErrors, setFormErrors] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const loginMutation = useRegister();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignup = (e) => {
        e.preventDefault();

        // Reset lỗi cũ
        setFormErrors({
            username: '',
            email: '',
            password: ''
        });

        // Kiểm tra dữ liệu rỗng
        const newErrors = {};
        let isValid = true;

        if (!formData.username.trim()) {
            newErrors.username = 'Please insert username';
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Please insert email';
            isValid = false;
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Please insert password';
            isValid = false;
        }

        // Nếu có lỗi thì hiển thị
        if (!isValid) {
            setFormErrors(newErrors);
            return;
        }

        // Gửi API nếu hợp lệ
        loginMutation.mutate(formData, {
            onSuccess: (data) => {
                toast.success('Register successfully!', {
                    position: 'top-right',
                    autoClose: 1500
                });
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            },
            onError: (error) => {
                const fieldErrors = error.response?.data?.errors;
            
                if (fieldErrors) {
                    setFormErrors(prev => ({
                        ...prev,
                        ...fieldErrors
                    }));
                } else {
                    const msg = error.response?.data?.message || "Register failed!";
                    toast.error(msg, { autoClose: 2000 });
                }
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
                                        placeholder="Le Tat Dinh"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                    {formErrors.username && <Form.Text className="text-danger">{formErrors.username}</Form.Text>}
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label className='fw-bold'>Email</Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='email'
                                        placeholder="abc@gmail.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {formErrors.email && <Form.Text className="text-danger">{formErrors.email}</Form.Text>}

                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-bold">Password</Form.Label>
                                    <div className="input-group">
                                        <Form.Control
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Dinh@1234"
                                            value={formData.password}
                                            onChange={handleChange}
                                            isInvalid={!!formErrors.password}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={toggleShowPassword}
                                            tabIndex={-1}
                                        >
                                            {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
                                        </button>
                                        <Form.Control.Feedback type="invalid">
                                            {formErrors.password}
                                        </Form.Control.Feedback>
                                    </div>
                                </Form.Group>

                                <Form.Group className='mb-3 text-center'>
                                    <Button variant='success' className='w-50' type='submit'>Register</Button>
                                </Form.Group>

                                <Form.Group className='mb-3 text-center'>
                                    <span className='ms-3'>Have an account? <a className=' text-success' href="/login">Login</a> </span>
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
