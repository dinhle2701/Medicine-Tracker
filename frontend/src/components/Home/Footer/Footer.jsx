/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './Footer.css'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <div className='footer'>
            <div>

                <Container className='text-start p-5'>
                    <Row>
                        <Col className='col-md-3 mb-4 w-50'>
                            <h4 class="fw-bold">
                                <span className='text-white fs-3'>
                                    <span className="text-success fw-semibold fs-">M</span>ind Care.
                                </span>
                            </h4>
                            <p class="small">Best quality treatment <br /> and patient care by professionals</p>
                            <p class="mt-3 mb-1">Follow socials</p>
                            <div class="d-flex gap-3">
                                <a href="#" class="text-white"><i class="bi bi-twitter-x fs-5"></i></a>
                                <a href="#" class="text-white"><i class="bi bi-instagram fs-5"></i></a>
                                <a href="#" class="text-white"><i class="bi bi-linkedin fs-5"></i></a>
                            </div>
                        </Col>
                        <Col className='mb-4'>
                            <h6 class="fs-5 mb-3 text-light">Company</h6>
                            <ul class="list-unstyled">
                                <li><a href="#" class=" text-decoration-none">About Us</a></li>
                                <li><a href="#" class=" text-decoration-none">Contact Us</a></li>
                            </ul>
                        </Col>
                        <Col className='mb-4'>
                            <h6 class="fs-5 mb-3 text-light">Patient</h6>
                            <ul class="list-unstyled">
                                <li><a href="#" class=" text-decoration-none">Find an Expert</a></li>
                                <li><a href="#" class=" text-decoration-none">Check your symptoms</a></li>
                            </ul>
                        </Col>
                        <Col className='mb-4'>
                            <h6 class="fs-5 mb-3 text-light">Physios</h6>
                            <ul class="list-unstyled">
                                <li><a href="#" class=" text-decoration-none">Find Partner</a></li>
                                <li><a href="#" class=" text-decoration-none">Blog</a></li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
                {/* <Container className="d-flex justify-content-between align-items-center p-5">
                    <div className="text-white text-start">
                        <span className="fw-semibold fs-3">
                            M<span>ind Care.</span>
                        </span>
                        <p className='mt-2'>Best quality treatment and <br />
                            patient care by professional
                        </p>
                        <p>Follow socials</p>
                        <div className='social'>

                        </div>
                    </div>
                    <div className="w-75 d-flex justify-content-between align-items-center p-5 text-start">
                        <div className='w-25'>
                            <h3>Company</h3>
                            <ul class="list-unstyled">
                                <li>About Us</li>
                                <li>Contact Us</li>
                            </ul>
                        </div>
                        <div className='w-25'>
                            <h3>Patient</h3>
                            <ul>
                                <li>hi</li>
                                <li>hi</li>
                                <li>hi</li>
                            </ul>
                        </div>
                        <div className='w-25'>
                            <h3>Physios</h3>
                            <ul>
                                <li>hi</li>
                                <li>hi</li>
                                <li>hi</li>
                            </ul>
                        </div>
                    </div>
                </Container> */}
            </div>

            <div className='text-center border-top py-4 text-light'>
                <span>@2025 Dinhle. All right reserved</span>
            </div>
        </div>
    )
}

export default Footer
