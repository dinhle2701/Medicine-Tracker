import React from 'react';
import { Navbar, Container, Form, FormControl, Image, Button, Dropdown } from 'react-bootstrap';
import { useUser } from '../../../context/UserContext'; 
import './CustomNavbar.css';
import Notification from '../Notification/Notification';


const CustomNavbar = () => {
  const { user, setUser } = useUser(); // Dùng context

  const handleInformation = () => {
    window.location.href = '/infor';
  };

  const handleMedicine = () => {
    window.location.href = '/medicine';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <Navbar  expand="lg" className="shadow-sm py-2">
      <Container fluid className="d-flex justify-content-between align-items-center mx-5">
        {/* Logo */}
        <Navbar.Brand href="/" className="text-success fw-semibold fs-4">
          <span className="fw-bold fs-3">M</span>ind Care.
        </Navbar.Brand>

        {/* Search */}
        <Form className="d-flex mx-auto w-50">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2 rounded-pill px-3"
            aria-label="Search"
          />
        </Form>

        {/* Right section */}
        <div className="d-flex align-items-center gap-3" style={{ minWidth: '200px', justifyContent: 'end' }}>
          <Notification />
          {/* <IoMdNotifications style={{width: "25px", height:"25px"}} className='me-4'/> */}

          {user ? (
            <Dropdown align="end">
              <Dropdown.Toggle
                as="div"
                className="p-0 border-0 shadow-none"
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex align-items-center">
                  <Image
                    src={user.avatar || 'https://randomuser.me/api/portraits/men/32.jpg'}
                    roundedCircle
                    width="40"
                    height="40"
                    className="me-2"
                  />
                  <div className="text-start">
                    <div className="fw-semibold text-dark">{user.iss || 'User'}</div>
                    <div className="fill-yellow-100 text-dark">{user.sub || 'User'}</div>
                  </div>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className='mt-2'>
                <Dropdown.Item onClick={handleInformation}>Infor</Dropdown.Item>
                <Dropdown.Item onClick={handleMedicine}>Medicine</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Button variant="success" href="/login" style={{background: "rgb(4, 194, 1)", border: "0", width: "40%"}}>Login</Button>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
