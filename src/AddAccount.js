import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddAccount() {
  const [userId, setUserId] = useState('');
  const [balance, setBalance] = useState('');
  const [pin, setPin] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault(); // Prevent default form submission behavior
		// Check if form fields are not empty
		if (!userId || !balance || !pin) {
			toast.warning("User ID , Balance and Pin are required!", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
		}
		handleAddAccount();
	};

	const handleAddAccount = () => {
		axios
			.get(`http://localhost:8080/api/addAccount?user_id=${userId}&balance=${balance}&PIN=${pin}`)
			.then((response) => {
				// Handle success
				console.log(response);
				console.log("Account created:", response.data);
				if (response.data == "Account Created Successfully") {
					toast.success("Account Added Successfully!", {
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
				setBalance("");
				setPin("");
			})
			.catch((error) => {
				// Handle error
				console.error("Error creating account:", error);
			});
	};

	return (
		<div className="modal-content">
			<h1>Add Account</h1>
			<form onSubmit={handleSubmit}>
				<label>User ID:</label>
				<input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
				<br />
				<label>Balance:</label>
				<input type="text" value={balance} onChange={(e) => setBalance(e.target.value)} />
				<br />

				<label> PIN:</label>
				<input type="password" value={pin} onChange={(e) => setPin(e.target.value)} />
				<br />

				<button type="submit">Add Account</button>
			</form>
		</div>
	);
}

export default AddAccount;
