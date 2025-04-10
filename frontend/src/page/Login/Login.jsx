import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../query/auth'; // Hook gọi API
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';
import { useUser } from '../../context/UserContext'; // đúng path tới UserContext


const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useUser(); // 👈 lấy hàm setUser từ context


    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const loginMutation = useLogin();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        loginMutation.mutate(formData, {
            onSuccess: (data) => {
                // console.log("Login success response:", data);
                localStorage.setItem('token', data.token);

                // Giải mã token để lấy role
                const decodedToken = jwtDecode(data.token);
                const role = decodedToken.role;

                setUser(decodedToken);

                toast.success('Login Successful!', {
                    position: 'top-right',
                    autoClose: 500
                });

                // Điều hướng theo role
                setTimeout(() => {
                    if (role === 'ADMIN') {
                        navigate('/admin'); // điều hướng đến trang admin
                    } else if (role === 'USER') {
                        navigate('/'); // điều hướng đến trang user
                    } else {
                        navigate('/user'); // fallback nếu không rõ role
                    }
                }, 1500);
            },
            onError: (error) => {
                const errorMessage = error.response?.data?.message || "Something went wrong";
            
                if (error.response?.status === 404 || error.response?.status === 401) {
                    toast.error(errorMessage, { autoClose: 1500 });
                } else {
                    toast.error("Unexpected error", { autoClose: 1500 });
                }
            
                // console.log("Status:", error.response?.status);
                // console.log("Message:", errorMessage);
            }
            
            
            
            
        });
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
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-bold">Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
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
