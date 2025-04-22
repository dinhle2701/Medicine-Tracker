/* eslint-disable no-lone-blocks */
import React from 'react'
import './Admission.css'
import { Container } from 'react-bootstrap'
import { FaWallet } from "react-icons/fa";
import { MdPersonalInjury } from "react-icons/md";
import { LuShieldPlus } from "react-icons/lu";


const Admission = () => {
    return (
        <div className='admission'>
            <Container className='py-5 text-start'>
                <h1 className='fw-bold'>Admission In Three Steps</h1>
                <span className='text-light'>Get the optimal physiotherapy treatment tailored to your
                    <br />
                    specific needs while minimizing out-of-pocket expenses
                </span>
                <div className="d-flex justify-content-between align-items-center mt-5 text-white">
                    <div className='admission-block p-4'>
                        <FaWallet className='admission-icon mb-4 d-flex justify-content-between align-items-center p-4' />
                        <h3>Discuss payment <br /> Options</h3>
                        <p>Reclaim your health. Overcome pain and limitations. Embrace a life without boundaries.</p>
                    </div>
                    <div className='admission-block p-4'>
                        <MdPersonalInjury className='admission-icon mb-4 d-flex justify-content-between align-items-center p-4' />
                        <h3>Personal <br /> Consultation</h3>
                        <p>Personalized consultations with our rehab experts for your unique addiction.</p>
                    </div>
                    <div className='admission-block p-4'>
                        <LuShieldPlus className='admission-icon mb-4 d-flex justify-content-between align-items-center p-4' />
                        <h3>Choose your <br />Rehab program</h3>
                        <p>Our admission team guides you through program differences for informed decisions.</p>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Admission