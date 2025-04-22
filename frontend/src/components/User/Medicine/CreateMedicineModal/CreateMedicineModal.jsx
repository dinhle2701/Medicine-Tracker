/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import API_PATHS from "../../../../constant/apiPath";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateMedicineModal = ({ show, handleClose, onCreated }) => {
    const [formData, setFormData] = useState({
        medicineName: '',
        dosage: '',
        frequency: ''
    });
    const [errors, setErrors] = useState({
        medicineName: '',
        dosage: '',
        frequency: ''
    });

    const getUserId = () => {
        const token = localStorage.getItem("token");
        if (!token) return null;
        const decoded = jwtDecode(token);
        return decoded.userId || decoded.sub;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Regex validation for the fields
    const validateFormData = () => {
        const { medicineName, dosage, frequency } = formData;
        let formErrors = {
            medicineName: '',
            dosage: '',
            frequency: ''
        };

        // Validate medicineName (should be 3-16 chars and start with an uppercase letter)
        const medicineNameRegex = /^[A-Z][a-zA-Z]{2,15}$/;
        if (!medicineNameRegex.test(medicineName)) {
            formErrors.medicineName = 'Medicine name should be 3-16 characters long and start with an uppercase letter.';
        }

        // Validate dosage (should be a number <= 1000)
        const dosageRegex = /^[0-9]{1,3}$/;
        if (!dosageRegex.test(dosage) || parseInt(dosage) > 1000) {
            formErrors.dosage = 'Dosage should be a number and less than or equal to 1000.';
        }

        // Validate frequency (should be a number < 7)
        const frequencyRegex = /^[0-6]$/;
        if (!frequencyRegex.test(frequency)) {
            formErrors.frequency = 'Frequency should be a number and less than 7.';
        }

        setErrors(formErrors);

        // Return false if there are any errors
        return !Object.values(formErrors).some(error => error !== '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data before submitting
        if (!validateFormData()) return;

        const userId = getUserId();
        if (!userId) return alert("User not found in token!");

        try {
            const res = await axios.post(`${API_PATHS.medicines}/medicines/user/${userId}/create`, {
                ...formData
            });

            toast.success('Create Medicine Successful!', {
                position: 'top-right',
                autoClose: 2500
            });
            onCreated(res.data); // reload list
            handleClose(); // close modal
        } catch (err) {
            toast.error('Create Medicine Failed!', {
                position: 'top-right',
                autoClose: 2500
            });
        }
    };

    useEffect(() => {
        if (!show) {
            setFormData({
                medicineName: '',
                dosage: '',
                frequency: ''
            });
            setErrors({
                medicineName: '',
                dosage: '',
                frequency: ''
            });
        }
    }, [show]);

    return (
        <Modal
            show={show}
            onHide={handleClose}
            animation={true}
            onExited={() => {
                setFormData({
                    medicineName: '',
                    dosage: '',
                    frequency: ''
                });
                setErrors({
                    medicineName: '',
                    dosage: '',
                    frequency: ''
                });
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>Add New Medicine</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Medicine Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="medicineName"
                            value={formData.medicineName}
                            onChange={handleChange}
                            isInvalid={!!errors.medicineName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.medicineName}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Dosage</Form.Label>
                        <Form.Control
                            type="text"
                            name="dosage"
                            value={formData.dosage}
                            onChange={handleChange}
                            isInvalid={!!errors.dosage}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.dosage}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Frequency</Form.Label>
                        <Form.Control
                            type="text"
                            name="frequency"
                            value={formData.frequency}
                            onChange={handleChange}
                            isInvalid={!!errors.frequency}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.frequency}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className="text-end">
                        <Button variant="secondary" onClick={handleClose} className="me-2">
                            Cancel
                        </Button>
                        <Button type="submit" variant="success">
                            Create
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateMedicineModal;
