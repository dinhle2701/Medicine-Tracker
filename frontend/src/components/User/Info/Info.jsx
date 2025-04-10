import React from 'react';
import { useUser } from '../../../context/UserContext'; // path đúng
import { Table, Image, Container } from 'react-bootstrap'
const Info = () => {
    const { user } = useUser();

    if (!user) {
        return <p>Loading user information...</p>;
    }

    return (
        <div className=" mt-4">
            <h2>User Information</h2>
            <Container>
                <div className="d-flex justify-content-around align-items-center">
                    <Image
                        src={user.avatar || 'https://randomuser.me/api/portraits/men/32.jpg'}
                        roundedCircle
                        width="350"
                        height="350"
                        className="me-2"
                    />
                    <Table striped className='w-50'>
                        <tbody>
                            <tr>
                                <th>Username: </th>
                                <td>{user.iss || 'Unknown'}</td>
                            </tr>
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
