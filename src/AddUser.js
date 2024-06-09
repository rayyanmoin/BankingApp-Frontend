import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddUser.css";

function AddUser() {
	const [name, setName] = useState("");
	const [status, setStatus] = useState("Active");
	const [cnic, setCnic] = useState("");
    const [fatherName, setFatherName] = useState("");
	const [phoneNo, setPhoneNo] = useState("");
	const [gender, setGender] = useState("Male");
	const [profession, setProfession] = useState("");
	const [age, setAge] = useState("");
		const handleSubmit = (event) => {
			event.preventDefault(); // Prevent default form submission behavior
			// Check if form fields are not empty
			if (!name || !cnic || !status || !fatherName || !phoneNo || !profession || !age) {
				toast.warning("All Fields are required!", {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				});
				return;
			}
			handleAddUser();
		};

		const handleAddUser = () => {
			axios
				.get(
					`http://localhost:8080/api/addUser?name=${name}&status=${status}&CNIC=${cnic}
			&fatherName=${fatherName}&phoneNo=${phoneNo}&gender=${gender}&profession=${profession}
			&age=${age}`
				)
				.then((response) => {
					// Handle success
					console.log("User created:", response.data);
					toast.success("User Added Successfully!", {
						position: "top-right",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
					});
					// Clear form fields
					setName("");
					setStatus("");
					setCnic("");
					setFatherName("");
					setPhoneNo("");
					setGender("");
					setProfession("");
					setAge("");
				})
				.catch((error) => {
					// Handle error
					console.error("Error creating user:", error);
				});
		};

		return (
			<div className="modal-content">
				<h1>Add User</h1>
				<form onSubmit={handleSubmit}>
					<label>Name:</label>
					<input type="text" value={name} onChange={(e) => setName(e.target.value)} />
					<label>CNIC:</label>
					<input type="text" value={cnic} onChange={(e) => setCnic(e.target.value)} />

					<label>Father Name:</label>
					<input type="text" value={fatherName} onChange={(e) => setFatherName(e.target.value)} />

					<label>Phone NO:</label>
					<input type="text" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />

					<label>Profession:</label>
					<input type="text" value={profession} onChange={(e) => setProfession(e.target.value)} />

					<label>Age:</label>
					<input type="text" value={age} onChange={(e) => setAge(e.target.value)} />

					<label>
						Gender:
						<select name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
						</select>
					</label>

					<label>
						Status:
						<select name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
							<option value="Active">Active</option>
							<option value="In-Active">Inactive</option>
						</select>
					</label>
					<button type="submit">Add User</button>
				</form>
			</div>
		);
}

export default AddUser;
