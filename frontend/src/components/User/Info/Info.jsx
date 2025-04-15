import React from 'react';
import { useUser } from '../../../context/UserContext'; // path đúng
import { Table, Image, Container } from 'react-bootstrap'
import './Info.css'

const Info = () => {
    const { user } = useUser();

    if (!user) {
        return <p>Loading user information...</p>;
    }

    return (
        <div className="info mt-4">
            <h2 className='mb-4'><strong>USER INFORMATION</strong></h2>
            <Container className='py-5'>
                <div className="d-flex justify-content-around align-items-center">
                    <Image
                        src={user.avatar || 'https://randomuser.me/api/portraits/men/32.jpg'}
                        roundedCircle
                        width="350"
                        height="350"
                        className="me-2"
                    />
                    <Table hover className='w-50 text-start'>
                        <h1 className='mb-5 text-secondary'>{user.iss || 'Unknown'}</h1>
                        <tbody>
                            <tr>
                                <th>Email:</th>
                                <td>{user.sub || 'Unknown'}</td>
                            </tr>
                            <tr>
                                <th>Role: </th>
                                <td>{user.role || 'Unknown'}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </Container>
        </div>
    );
};

export default Info;
