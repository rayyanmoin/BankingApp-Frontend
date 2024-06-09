import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { UserFilter,StatusFilter,NameFilter } from "ag-grid-react";

import "./UserList.css";

const UserList = () => {
	const [User, setUser] = useState([]);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.get("http://localhost:8080/api/users");
				setUser(response.data);
			} catch (error) {
				console.error("Error fetching user:", error);
			}
		};

		fetchUser();
	}, []);

	const columnDefs = [
		{ headerName: "Id", field: "id", width: 75 },
		{
			headerName: "Name",
			field: "name",
			width: 100,
			filter: "NameFilter",
		},

		{ headerName: "CNIC", field: "cnic", width: 120, filter: "UserFilter" },
		{ headerName: "Father Name", field: "fatherName", width: 150 },
		{ headerName: "Phone No", field: "phoneNo", width: 120 },
		{ headerName: "Profession", field: "profession", width: 150 },
		{ headerName: "Age", field: "age", width: 75 },
		{ headerName: "Gender", field: "gender", width: 100 },
		{ headerName: "Status", field: "status", width: 100, filter: "StatusFilter" },
	];

	return (
		<div
			className="ag-theme-alpine"
			style={{ height: "550px", width: "1000px", margin: "0 auto", fontFamily: "Agency FB", fontSize: "20px" }}
		>
			<h1>Users List</h1>
			<AgGridReact
				columnDefs={columnDefs}
				rowData={User}
				pagination={true}
				paginationPageSize={20}
				frameworkComponents={{ UserFilter: UserFilter, StatusFilter: StatusFilter, NameFilter: NameFilter }}
			/>
		</div>
	);
};

export default UserList;
