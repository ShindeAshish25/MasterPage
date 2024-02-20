import React, { useState, useEffect } from "react";

export default function Masterpage() {
    const [localdata, setLocaldata] = useState([]);


    const [formData, setFormData] = useState({
        name: '',
        employeeId: '',
        gender: '',
        city: '',
    });




    const [editformData, setEditFormData] = useState({});
    const [disabled, setDisabled] = useState()

    const handleEditEvent = (data) => (event) => {
        setEditFormData(data)
        setDisabled(false)
    }
    const handleViewEvent = (data) => (event) => {
        setEditFormData(data)
        setDisabled(true)
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });

    };
    console.log("Form submitted:", formData);

    const handleSubmit = (e) => {
        e.preventDefault();
        const existingData = JSON.parse(localStorage.getItem('customerData')) || [];

        const newData = [...existingData, formData];
        localStorage.setItem('customerData', JSON.stringify(newData));

        setFormData({

        });
        window.location.reload();
    };

    const handleSubmitEdit = (e) => {
        const updatedData = localdata.map((data) =>
            data.employeeId === editformData.employeeId ? editformData : data
        );
        localStorage.setItem("customerData", JSON.stringify(updatedData));
        setLocaldata(updatedData);
    }

    useEffect(() => {
        const savedData = localStorage.getItem('customerData');
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                setLocaldata(parsedData);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        }
    }, []);


    const handleInputChangeEdit = (event) => {
        const { name, value } = event.target;
        setEditFormData({
            ...editformData,
            [name]: value,
        });
    }

    const handleDelete = (employeeId) => {
        // Filter out the row with the specified employeeId from localdata
        const updatedData = localdata.filter((data) => data.employeeId !== employeeId);

        // Update localdata and also update localStorage
        setLocaldata(updatedData);
        localStorage.setItem("customerData", JSON.stringify(updatedData));
    };

    return (
        <div className="container mt-5 main">
            <div className="row bg-primary text-white">
                <div className="col-12 p-1">

                    <h3>Employee Master Page</h3>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <form className="row" onSubmit={handleSubmit}>

                        <div className="col-6">
                            <label htmlFor="inputEmail4" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputEmail4"
                                name="name"
                                value={formData.name || ""}
                                onChange={handleInputChange}
                                placeholder="Please Enter Name"
                                required
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="inputPassword4" className="form-label">Employee ID</label>
                            <input
                                type="number"
                                className="form-control"
                                id="inputPassword4"
                                name="employeeId"
                                value={formData.employeeId || ""}
                                onChange={handleInputChange}
                                placeholder="Please Enter Only Number"
                                required

                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="inputState" className="form-label">City</label>
                            <select
                                id="inputState"
                                className="form-select"
                                name="city"
                                value={formData.city || ""}
                                onChange={handleInputChange}
                                required

                            >
                                <option value="" disabled>Choose...</option>
                                <option value="NEWYORK">NEWYORK</option>
                                <option value="LONDON">LONDON</option>
                                <option value="TOKYO">TOKYO</option>
                            </select>
                        </div>
                        <div className="col-6 d-flex">
                            <div className="form-check mt-3">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="gender"
                                    id="maleRadio"
                                    value="Male"
                                    onChange={handleInputChange}
                                    checked={formData.gender === 'Male'}
                                    required

                                />
                                <label className="form-check-label" htmlFor="maleRadio">
                                    Male
                                </label>
                            </div>
                            <div className="form-check mt-3">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="gender"
                                    id="femaleRadio"
                                    value="Female"
                                    onChange={handleInputChange}
                                    checked={formData.gender === 'Female'}
                                    required

                                />
                                <label className="form-check-label" htmlFor="femaleRadio">
                                    Female
                                </label>
                            </div>
                        </div>
                        <div className="col-12 text-end">
                            <button type="submit" className="btn btn-primary" >Save</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="table mt-5 shadow">
                <table className="table">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Sr.No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Emp employeeId</th>
                            <th scope="col">City</th>
                            <th scope="col">Gender</th>
                            <th scope="col" className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {localdata?.map((data, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.name}</td>
                                <td>{data.employeeId}</td>
                                <td>{data.city}</td>
                                <td>{data.gender}</td>
                                <td className="text-center"><button className="me-2 btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={handleViewEvent(data)}>View</button>
                                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={handleEditEvent(data)}>Edit</button>
                                    <button
                                        className="btn btn-danger ms-2"
                                        onClick={() => handleDelete(data.employeeId)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modalmainDiv">
                    <div className="modal-content modalDiv">
                        <div className="modal-header">
                            <h5 className="modal-title">{disabled ? "View" : "Edit"}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="row g-3" onSubmit={handleSubmitEdit}>
                                <div className="col-6">
                                    <label htmlFor="inputEmail4" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputEmail4"
                                        name="name"
                                        defaultValue={editformData.name || ""}
                                        value={editformData.name}
                                        onChange={handleInputChangeEdit}
                                        disabled={disabled}
                                    />
                                </div>
                                <div className="col-6">
                                    <label htmlFor="inputPassword4" className="form-label">Employee ID</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="inputPassword4"
                                        name="employeeId"
                                        defaultValue={editformData?.employeeId}
                                        value={editformData.employeeId}
                                        onChange={handleInputChangeEdit}
                                        required
                                        disabled={true}


                                    />
                                </div>
                                <div className="col-6">
                                    <label htmlFor="inputState" className="form-label">City</label>
                                    <select
                                        id="inputState"
                                        className="form-select"
                                        name="city"
                                        defaultValue={editformData?.city}
                                        value={editformData?.city}
                                        onChange={handleInputChangeEdit}
                                        disabled={disabled}
                                    >
                                        <option value="" disabled>Choose...</option>
                                        <option value="NEWYORK">NEWYORK</option>
                                        <option value="LONDON">LONDON</option>
                                        <option value="TOKYO">TOKYO</option>
                                    </select>
                                </div>
                                <div className="col-6 d-flex">
                                    <div className="form-check mt-3">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="gender"
                                            id="maleRadio"
                                            value="Male"
                                            onChange={handleInputChangeEdit}
                                            checked={editformData.gender === 'Male'}
                                            disabled={disabled}
                                        />
                                        <label className="form-check-label" htmlFor="maleRadio">
                                            Male
                                        </label>
                                    </div>
                                    <div className="form-check mt-3">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="gender"
                                            id="femaleRadio"
                                            value="Female"
                                            onChange={handleInputChangeEdit}
                                            checked={editformData.gender === 'Female'}
                                            disabled={disabled}
                                        />
                                        <label className="form-check-label" htmlFor="femaleRadio">
                                            Female
                                        </label>
                                    </div>
                                </div>
                                <div className="col-12 text-end">
                                    <button type="submit" className="btn btn-primary" >Save</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
