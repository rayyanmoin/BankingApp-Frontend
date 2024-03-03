import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function WithdrawMoney() {
	const [accountId, setaccountId] = useState("");
	const [amount, setamount] = useState("");
	const [pin, setPin] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault(); // Prevent default form submission behavior
		// Check if form fields are not empty
		if (!accountId || !amount || !pin) {
			toast.warning("Account Id , Amount and Pin are required!", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
		}
		handleWithdrawMoney();
	};

	const handleWithdrawMoney = () => {
		axios
			.get(`http://localhost:8080/api/withdrawmoney?accountId=${accountId}&amount=${amount}&PIN=${pin}`)
			.then((response) => {
				// Handle success
				console.log(response);
				console.log("Money Withdrawed:", response.data);
				if (response.data == "Amount Withdraw successful for Account") {
					toast.success("Amount Withdrawal Successfully!", {
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
				setaccountId("");
				setamount("");
				setPin("");
			})
			.catch((error) => {
				// Handle error
				console.error("Error when Withdraw:", error);
			});
	};

	return (
		<div className="modal-content">
			<h1>Withdraw Money</h1>
			<form onSubmit={handleSubmit}>
				<label>Account ID:</label>
				<input type="text" value={accountId} onChange={(e) => setaccountId(e.target.value)} />
				<br />
				<label>Amount Withdraw:</label>
				<input type="text" value={amount} onChange={(e) => setamount(e.target.value)} />
				<br />

				<label> PIN:</label>
				<input type="password" value={pin} onChange={(e) => setPin(e.target.value)} />
				<br />

				<button type="submit">Withdraw Money</button>
			</form>
		</div>
	);
}

export default WithdrawMoney;
