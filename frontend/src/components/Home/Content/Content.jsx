import React from 'react'
import { Image, Container, Button } from 'react-bootstrap'
import './Content.css'
import { FaStar } from "react-icons/fa";

const Content = () => {
    return (
        <div className='content-wrapper my-5'>
            <Container className='d-flex justify-content-between align-items-center'>
                <div className='w-50 text-start'>
                    <h1>Secure A Pain-Free Life With The Guidance Of Health Experts</h1>
                    <p className='my-5'>Reclaim your health. Overcome pain and limitations. <br />
                        Embrace a life without boundaries.</p>
                    <Button className='mb-5'>Get Started</Button>
                    <div className='about-us d-flex  align-items-center text-start'>
                        <div className='me-3'>
                            <p className='d-flex align-items-center mb-1'><FaStar className='me-2' /><strong> About Us</strong> </p>
                            <span className='d-flex text-warning'>
                                <FaStar className='me-1' />
                                <FaStar className='me-1' />
                                <FaStar className='me-1' />
                                <FaStar className='me-1' />
                                <FaStar />

                            </span>
                        </div>
                        <div>
                            <span className='d-flex align-items-center'><strong>5.0</strong></span>
                            <span>200 reviews</span>
                        </div>
                    </div>
                </div>
                <div className='w-50'>
                    <Image width={"80%"} src='https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*' />
                </div>
            </Container>
        </div>
    )
}

export default Content
