import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddLoan() {
	const [userId, setUserId] = useState("");
	const [sanctionAmount, setSanctionAmount] = useState("");
	const [accountNo, setAccountNo] = useState("");
	const [pin, setPin] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault(); // Prevent default form submission behavior
		// Check if form fields are not empty
		if (!userId || !sanctionAmount || !accountNo || !pin) {
			toast.warning("User ID , SanctionAmount , AccountNo and PIN are required!", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
		}
		handleAddLoan();
	};

	const handleAddLoan = () => {
		axios
			.get(
				`http://localhost:8080/api/addloan?userId=${userId}&sanctionAmount=${sanctionAmount}&accountNumber=${accountNo}&PIN=${pin}`
			)
			.then((response) => {
				// Handle success
				console.log(response);
				console.log("Loan created:", response.data);
				if (response.data == "Loan Amount Aproved") {
					toast.success("Loan Added Successfully!", {
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
				setSanctionAmount("");
				setAccountNo("");
				setPin("");
			})
			.catch((error) => {
				// Handle error
				console.error("Error creating loan:", error);
			});
	};

	return (
		<div className="modal-content">
			<h1>Add Loan</h1>
			<form onSubmit={handleSubmit}>
				<label>User ID:</label>
				<input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
				<br />
				<label>Sanction Amount:</label>
				<input type="text" value={sanctionAmount} onChange={(e) => setSanctionAmount(e.target.value)} />
				<br />
				<label>Account No.:</label>
				<input type="text" value={accountNo} onChange={(e) => setAccountNo(e.target.value)} />
				<br />
				<label>PIN:</label>
				<input type="password" value={pin} onChange={(e) => setPin(e.target.value)} />
				<br />
				<button type="submit">Add Loan</button>
			</form>
		</div>
	);
}

export default AddLoan;
