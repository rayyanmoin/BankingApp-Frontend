import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddUser.css";

function AddUser() {
	const [name, setName] = useState("");
	const [status, setStatus] = useState("Active");
	const [cnic, setCnic] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault(); // Prevent default form submission behavior
		// Check if form fields are not empty
		if (!name || !cnic || !status) {
			toast.warning("All Fields are required!", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
			return 
		}
		handleAddUser();
	};

	const handleAddUser = () => {
		axios
			.get(`http://localhost:8080/api/addUser?name=${name}&status=${status}&CNIC=${cnic}`)
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
				<label>
					Status:
					<select name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
						<option value="Active">Active</option>
						<option value="In-Active">Inactive</option>
					</select>
				</label>

				<label>CNIC:</label>
				<input type="text" value={cnic} onChange={(e) => setCnic(e.target.value)} />
				<button type="submit">Add User</button>
			</form>
		</div>
	);
}

export default AddUser;
