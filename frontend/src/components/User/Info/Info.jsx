import React from 'react';
import { useUser } from '../../../context/UserContext'; // path đúng
import { Table, Image, Container, Form, Row, Col } from 'react-bootstrap'
import './Info.css'

const Info = () => {
    const { user } = useUser();

    if (!user) {
        return <p>Loading user information...</p>;
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log('Selected file:', file);
        // Bạn có thể upload lên server hoặc lưu vào state
      };
      

    return (
        <div className="info mt-4">
            <h2 className="mb-4 text-center"><strong>USER INFORMATION</strong></h2>
            <Container className="py-5 info-container">
                <Row className="align-items-center">
                    <Col xs={12} md={4} className="text-center mb-4 mb-md-0">
                        <Image
                            src={user.avatar || 'https://randomuser.me/api/portraits/men/32.jpg'}
                            roundedCircle
                            width="250"
                            height="250"
                            className="shadow"
                        />
                        <Form.Group controlId="formFile" className="mt-3 d-flex justify-content-center">
                            <Form.Control className='w-50' type="file" onChange={handleFileChange} placeholder='choose avatar'/>
                        </Form.Group>


                    </Col>
                    <Col xs={12} md={8}>
                        <h3 className="mb-4 text-secondary">{user.iss || 'Unknown'}</h3>
                        <Table hover responsive className="text-start">
                            <tbody>
                                <tr>
                                    <th>Email:</th>
                                    <td>{user.sub || 'Unknown'}</td>
                                </tr>
                                <tr>
                                    <th>Role:</th>
                                    <td>{user.role || 'Unknown'}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>

    );
};

export default Info;
