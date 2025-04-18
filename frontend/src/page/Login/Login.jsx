import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../query/auth'; // Hook gọi API
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';
import { useUser } from '../../context/UserContext'; // đúng path tới UserContext
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";


const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useUser(); // 👈 lấy hàm setUser từ context


    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [formErrors, setFormErrors] = useState({
        email: '',
        password: ''
    });


    const loginMutation = useLogin();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const emailRegex = /^[a-zA-Z0-9._%+-]{4,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*_]{8,16}$/;

    const handleLogin = (e) => {
        e.preventDefault();

        // Reset lỗi cũ
        setFormErrors({
            email: '',
            password: ''
        });

        // Validate form phía client
        const newErrors = {};
        let isValid = true;

        // Kiểm tra email
        if (!formData.email.trim()) {
            newErrors.email = 'Please insert email';
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Invalid email format. Email must be like 'abc@gmail.com'";
            isValid = false;
        }

        // Kiểm tra password
        if (!formData.password.trim()) {
            newErrors.password = 'Please insert password';
            isValid = false;
        }
        else if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'Password must be 8-16 characters with uppercase, lowercase, and number.';
            isValid = false;
        }

        if (!isValid) {
            setFormErrors(newErrors);
            return;
        }

        // Nếu không có lỗi -> gọi API
        loginMutation.mutate(formData, {
            onSuccess: (data) => {
                localStorage.setItem('token', data.token);
                const decodedToken = jwtDecode(data.token);
                const role = decodedToken.role;
                setUser(decodedToken);

                toast.success('Login Successful!', {
                    position: 'top-right',
                    autoClose: 500
                });

                setTimeout(() => {
                    if (role === 'ADMIN') {
                        navigate('/admin');
                    } else if (role === 'USER') {
                        navigate('/');
                    } else {
                        navigate('/user');
                    }
                }, 1500);
            },
            onError: (error) => {
                const errorMessage = error.response?.data?.message || "Something went wrong";
                setFormErrors({ email: '', password: '' });

                const msg = errorMessage.toLowerCase();
                if (error.response?.status === 401 || error.response?.status === 404) {
                    if (msg.includes('email') || msg.includes('tài khoản')) {
                        setFormErrors(prev => ({ ...prev, email: errorMessage }));
                    } else if (msg.includes('password') || msg.includes('mật khẩu')) {
                        setFormErrors(prev => ({ ...prev, password: errorMessage }));
                    } else {
                        setFormErrors(prev => ({ ...prev, email: errorMessage }));
                    }
                } else {
                    toast.error("Unexpected error", { autoClose: 1500 });
                }
            }
        });
    };


    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };


    return (
        <div className="signin">
            <ToastContainer />
            <Container className="form-container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <Row className="w-100">
                    <Col xs={12} sm={10} md={8} lg={6} className="mx-auto">
                        <div className="form-control p-4">
                            <h2 className="text-center">Login</h2>
                            <Form onSubmit={handleLogin}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="email"
                                        placeholder="abc@gmail.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        isInvalid={!!formErrors.email}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {formErrors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-bold">Password</Form.Label>
                                    <div className="input-group">
                                        <Form.Control
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Enter your password"
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



                                <Form.Group className="mb-3 text-center">
                                    <Button variant='success' className="w-50" type="submit" disabled={loginMutation.isLoading}>
                                        {loginMutation.isLoading ? 'Logging in...' : 'Login'}
                                    </Button>
                                </Form.Group>

                                <Form.Group className="mb-3 text-center">
                                    <span className="ms-3">
                                        <a href="/register" className=' text-success'>Register</a>
                                    </span>
                                </Form.Group>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;
