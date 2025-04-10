import React from 'react'
import { Container, Image } from 'react-bootstrap'
import './Stories.css'
const Stories = () => {
    return (
        <div className='stories bg-white p-5'>
            <Container>
                <div>
                    <h2 className='pt-2'>
                        Happy stories from friends <br />
                        who became <span className='text-success'>superheroes</span>
                    </h2>
                </div>

                <div className='mt-5 d-flex justify-content-between align-items-center'>
                    <div className='stories-block text-start p-5'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium nobis, dolor velit itaque atque repudiandae distinctio?</p>
                        <div className="d-flex align-items-center">
                            <Image
                                src={'https://randomuser.me/api/portraits/men/32.jpg'}
                                roundedCircle
                                width="40"
                                height="40"
                                className="me-2"
                            />
                            <div className="text-start">
                                <div className="fw-semibold text-dark">{'User'}</div>
                                <div className="fill-yellow-100 text-dark">{'User'}</div>
                            </div>
                        </div>
                    </div>
                    <div className='stories-block text-start p-5'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium nobis, dolor velit itaque atque repudiandae distinctio?</p>
                        <div className="d-flex align-items-center">
                            <Image
                                src={'https://randomuser.me/api/portraits/men/32.jpg'}
                                roundedCircle
                                width="40"
                                height="40"
                                className="me-2"
                            />
                            <div className="text-start">
                                <div className="fw-semibold text-dark">{'User'}</div>
                                <div className="fill-yellow-100 text-dark">{'User'}</div>
                            </div>
                        </div>
                    </div>
                    <div className='stories-block text-start p-5'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium nobis, dolor velit itaque atque repudiandae distinctio?</p>
                        <div className="d-flex align-items-center">
                            <Image
                                src={'https://randomuser.me/api/portraits/men/32.jpg'}
                                roundedCircle
                                width="40"
                                height="40"
                                className="me-2"
                            />
                            <div className="text-start">
                                <div className="fw-semibold text-dark">{'User'}</div>
                                <div className="fill-yellow-100 text-dark">{'User'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Stories
