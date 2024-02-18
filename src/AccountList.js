import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { AccountNO} from "ag-grid-react";

import "./AccountList.css";

const AccountList = () => {
	const [accounts, setAccounts] = useState([]);

	useEffect(() => {
		const fetchAccounts = async () => {
			try {
				const response = await axios.get("http://localhost:8080/api/accounts");
				setAccounts(response.data);
			} catch (error) {
				console.error("Error fetching accounts:", error);
			}
		};

		fetchAccounts();
	}, []);


	const columnDefs = [
		{ headerName: "Id", field: "id", width: 150 },
		{
			headerName: "UserID",
			field: "userId",
			width: 250, // Auto-adjust row height based on content
		},
		{ headerName: "AccountNo", field: "accountNo", width: 250, filter: "AccountNO" },
		{ headerName: "Balance", field: "balance", width: 250 }
	];

	return (
		<div
			className="ag-theme-alpine"
			style={{ height: "550px", width: "1000px", margin: "0 auto", fontFamily: "Agency FB", fontSize: "20px" }}
		>
			<h1>Accounts List</h1>
			<AgGridReact
				columnDefs={columnDefs}
				rowData={accounts}
				pagination={true}
				paginationPageSize={20}
				frameworkComponents={{ AccountNO: AccountNO}}
			/>
		</div>
	);
};

export default AccountList;
