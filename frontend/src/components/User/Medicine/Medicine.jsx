/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // nhớ import nếu chưa có
import axios from "axios";
import API_PATHS from "../../../constant/apiPath";
import { Table, Container, Button } from 'react-bootstrap'
import { MdAddToPhotos } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateMedicineModal from './CreateMedicineModal/CreateMedicineModal'; // path tùy vào bạn
import UpdateMedicineModal from "./UpdateMedicineModal/UpdateMedicineModal";


function Medicine() {
    // modal
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedMedicineId, setSelectedMedicineId] = useState(null);
    const handleOpenUpdateModal = (id) => {
        setSelectedMedicineId(id);
        setShowUpdateModal(true);
    };

    const handleMedicineCreated = (newMedicine) => {
        setMedicines(prev => [...prev, newMedicine]); // cập nhật danh sách ngay
        setShowModal(false)
    };

    const handleMedicineUpdated = (updatedMedicine) => {
        setMedicines(prev =>
            prev.map(m => (m.id === updatedMedicine.id ? updatedMedicine : m))
        );
        setShowUpdateModal(false);
    };


    const [medicines, setMedicines] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const decoded = jwtDecode(token);
                const userId = decoded?.userId || decoded?.id;

                const response = await axios.get(`${API_PATHS.medicines}/medicines/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log("API response:", response.data);

                setMedicines(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMedicines();
    }, []);

    const [deletingId, setDeletingId] = useState(null);
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this medicine?");
        if (!confirmDelete) return;

        setDeletingId(id);
        try {
            await axios.delete(`${API_PATHS.medicines}/medicines/user/delete/${id}`);
            toast.success("Medicine deleted successfully!");
            setMedicines(prev => prev.filter(m => m.id !== id));
        } catch (error) {
            toast.error("Failed to delete medicine");
            console.error(error.message);
        } finally {
            setDeletingId(null);
        }
    };


    return (
        <div className="medicines bg-white m-3 p-4">
            <Container className="w-100">
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="mb-4">Medicines</h1>
                    <Button className="d-flex align-items-center" onClick={handleOpenModal}>
                        <MdAddToPhotos className="me-2" /> Add New
                    </Button>
                </div>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Medicine Name</th>
                            <th>Dosage</th>
                            <th>Frequency</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicines
                            .filter(item => item && item.medicineName) // tránh undefined/null
                            .map((item, index) => (
                                <tr key={item.id || index}>
                                    <td>{index + 1}</td>
                                    <td>{item.medicineName}</td>
                                    <td>{item.dosage}</td>
                                    <td>{item.frequency}</td>
                                    <td className="d-flex justify-content-evenly align-items-center">
                                        <Button
                                            className="d-flex align-items-center"
                                            variant="secondary"
                                            onClick={() => handleOpenUpdateModal(item.id)}>
                                            <FaPencilAlt className="me-2" /> Update
                                        </Button>

                                        <Button
                                            className="d-flex align-items-center"
                                            variant="warning"
                                            onClick={() => handleDelete(item.id)}
                                            disabled={deletingId === item.id}
                                        ><FaDeleteLeft className="me-2" />Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}

                    </tbody>
                </Table>
            </Container>
            <CreateMedicineModal
                show={showModal}
                handleClose={setShowModal}
                onCreated={handleMedicineCreated}
            />

            <UpdateMedicineModal
                show={showUpdateModal}
                handleClose={() => setShowUpdateModal(false)}
                onCreated={handleMedicineUpdated}
                medicineId={selectedMedicineId}
            />
        </div>
    );
}

export default Medicine;
