import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { SanctionAmount } from "ag-grid-react";

import "./LoanList.css";

const LoanList = () => {
	const [loan, setLoan] = useState([]);

	useEffect(() => {
		const fetchLoan = async () => {
			try {
				const response = await axios.get("http://localhost:8080/api/loans");
				setLoan(response.data);
			} catch (error) {
				console.error("Error fetching loans:", error);
			}
		};

		fetchLoan();
	}, []);

	const columnDefs = [
		{ headerName: "Id", field: "id", width: 150 },
		{
			headerName: "UserID",
			field: "userId",
			width: 250, // Auto-adjust row height based on content
		},
		{ headerName: "Sanction Amount", field: "sanctionAmount", width: 250, filter: "SanctionAmount" },
	];

	return (
		<div
			className="ag-theme-alpine"
			style={{ height: "550px", width: "1000px", margin: "0 auto", fontFamily: "Agency FB", fontSize: "20px" }}
		>
			<h1>Loan List</h1>
			<AgGridReact
				columnDefs={columnDefs}
				rowData={loan}
				pagination={true}
				paginationPageSize={20}
				frameworkComponents={{ SanctionAmount: SanctionAmount }}
			/>
		</div>
	);
};

export default LoanList;
