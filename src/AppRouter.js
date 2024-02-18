import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import 'Routes' instead of 'Switch'
import AccountList from "./AccountList";
import NavBar from "./NavBar";
import AddUser from "./AddUser";
import Home from "./Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateQuiz from "./CreateQuiz";
import LoanList from "./LoanList";
import UserList from "./UserList";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";

const AppRouter = () => {
	const [loggedInUser, setLoggedInUser] = useState(null);

	const handleLogin = (user) => {
		setLoggedInUser(user);
	};
	return (
		<Router>
			<ToastContainer />
			<NavBar loggedInUser={loggedInUser} /> {/* Include the NavBar component */}
			<Routes>
				<Route path="/register" element={<Register />} />
				<Route path="/" element={<Login onLogin={handleLogin} />} />
				<Route path="/home" element={<Home />} />
				{/* Use 'Routes' instead of 'Switch' */}
				<Route path="/accountlist" element={<AccountList />} />
				<Route path="/addUser" element={<AddUser />} />
				<Route path="/createquiz" element={<CreateQuiz />} />
				<Route path="/loanlist" element={<LoanList />} />
				<Route path="/userList" element={<UserList />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
		</Router>
	);
};

export default AppRouter;
