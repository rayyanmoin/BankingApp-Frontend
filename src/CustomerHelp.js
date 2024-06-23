import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ProblemType } from "ag-grid-react";

import "./CustomerHelp.css";

const CustomerHelp = () => {
	const [customerHelp, setCustomerHelp] = useState([]);

	useEffect(() => {
		const fetchCustomerHelp = async () => {
			try {
				const response = await axios.get("http://localhost:8080/api/customer");
				setCustomerHelp(response.data);
			} catch (error) {
				console.error("Error fetching Customer Help:", error);
			}
		};

		fetchCustomerHelp();
	}, []);

	const columnDefs = [
		{ headerName: "Id", field: "id", width: 150 },
		{
			headerName: "UserID",
			field: "userId",
			width: 100, // Auto-adjust row height based on content
		},
		{ headerName: "Problem Type", field: "problemType", width: 150, filter: "ProblemType" },
		{ headerName: "Description", field: "description", width: 480 },
		{ headerName: "Status", field: "status", width: 100 },
	];

	return (
		<div
			className="ag-theme-alpine"
			style={{ height: "550px", width: "1000px", margin: "0 auto", fontFamily: "Agency FB", fontSize: "20px" }}
		>
			<h1>Customer Help List</h1>
			<AgGridReact
				columnDefs={columnDefs}
				rowData={customerHelp}
				pagination={true}
				paginationPageSize={20}
				frameworkComponents={{ ProblemType: ProblemType }}
			/>
		</div>
	);
};

export default CustomerHelp;
