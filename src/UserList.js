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
		{ headerName: "Id", field: "id", width: 150 },
		{
			headerName: "Name",
			field: "name",
			width: 250,
			filter:"NameFilter"
		},
		{ headerName: "Status", field: "status", width: 150, filter: "StatusFilter" },
		{ headerName: "CNIC", field: "cnic", width: 150, filter: "UserFilter" },
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
