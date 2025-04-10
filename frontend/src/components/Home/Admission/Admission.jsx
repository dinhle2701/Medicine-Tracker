import React from 'react'
import { Container } from 'react-bootstrap'

const Admission = () => {
    return (
        <div className='admission'>
            <Container>
                <div class="container py-5 bg-secondary">
                    <div class="text-center mb-5">
                        <h2 class="fw-bold text-success">Admission In Three Steps</h2>
                        <p class="text-light">Get the optimal physiotherapy treatment tailored to your specific needs while minimizing out-of-pocket expenses.</p>
                    </div>

                    <div class="row g-5">
                        {/* <!-- Step 1 --> */}
                        <div class="col-md-4 bg-white">
                            <div class="step-box">
                                <div class="step-icon">
                                    <i class="bi bi-credit-card"></i>
                                </div>
                                <h5 class="fw-bold">Discuss payment options</h5>
                                <p class="step-description">Reclaim your health. Overcome pain and limitations. Embrace a life without boundaries.</p>
                            </div>
                        </div>

                        {/* <!-- Step 2 --> */}
                        <div class="col-md-4 bg-white">
                            <div class="step-box">
                                <div class="step-icon">
                                    <i class="bi bi-person-lines-fill"></i>
                                </div>
                                <h5 class="fw-bold">Personal Consultation</h5>
                                <p class="step-description">Personalized consultations with our rehab experts for your unique addiction.</p>
                            </div>
                        </div>

                        {/* <!-- Step 3 --> */}
                        <div class="col-md-4 bg-white">
                            <div class="step-box">
                                <div class="step-icon">
                                    <i class="bi bi-shield-check"></i>
                                </div>
                                <h5 class="fw-bold">Choose your Rehab program</h5>
                                <p class="step-description">Our admission team guides you through program differences for informed decisions.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Admission
