import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddCustomerHelp() {
	const [userId, setUserId] = useState("");
	const [users, setUsers] = useState([]);
	const [problemType, setProblemType] = useState("Debit Card");
	const [description, setDescription] = useState("");
	const [status, setStatus] = useState("Open");

	useEffect(() => {
		axios
			.get("http://localhost:8080/api/usersForDropdown")
			.then((response) => {
				setUsers(response.data);
			})
			.catch((error) => {
				console.error("There was an error fetching the users!", error);
			});
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault(); // Prevent default form submission behavior
		// Check if form fields are not empty
		if (!userId || !problemType || !description || !status) {
			toast.warning("User , Problem Type and description and status are required!", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
            return;
		}
		handleAddCustomerHelp();
	};

	const handleAddCustomerHelp = () => {
		axios
			.post("http://localhost:8080/api/customer/save", {
				userId: userId,
				problemType: problemType,
				description: description,
				status: status,
			})
			.then((response) => {
				if (response.data === "Customer Help record save successfully") {
					toast.success("Customer Help Added Successfully!", {
						position: "top-right",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
					});
				} else {
					toast.warning(response.data, {
						position: "top-right",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
					});
				}
				// Clear form fields
				setUserId("");
				setProblemType("");
				setDescription("");
				setStatus("");
			})
			.catch((error) => {
				// Handle error
				console.error("Error creating customer help:", error);
			});
	};


	return (
		<div className="modal-content">
			<h1>Add Customer Help</h1>
			<form onSubmit={handleSubmit}>
				<label>User:</label>
				<select value={userId} onChange={(e) => setUserId(e.target.value)}>
					<option value="">Select User</option>
					{users.map((user) => (
						<option key={user.id} value={user.id}>
							{user.username}
						</option>
					))}
				</select>
				<br />
				<label> Description:</label>
				<textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
				<br />

				<label>
					Problem Type:
					<select name="problemType" value={problemType} onChange={(e) => setProblemType(e.target.value)}>
						<option value="Debit Card">Debit Card</option>
						<option value="Credit Card">Credit Card</option>
						<option value="ATM">ATM</option>
						<option value="Cheque Book">Cheque Book</option>
					</select>
				</label>
				<br />

				<label>
					Status:
					<select name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
						<option value="Open">Open</option>
						<option value="In Progess">In Progess</option>
						<option value="Resolved">Resolved</option>
					</select>
				</label>

				<button type="submit">Add Customer Help</button>
			</form>
		</div>
	);
}

export default AddCustomerHelp;
