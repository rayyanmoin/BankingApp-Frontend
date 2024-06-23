import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import 'Routes' instead of 'Switch'
import AccountList from "./AccountList";
import NavBar from "./NavBar";
import AddUser from "./AddUser";
import Home from "./Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoanList from "./LoanList";
import UserList from "./UserList";
import Dashboard from "./Dashboard";
import Register from "./Register";
import AddAccount from "./AddAccount";
import AddLoan from "./AddLoan";
import DepositMoney from "./DepositMoney";
import WithdrawMoney from "./WithdrawMoney";
import CustomerHelp from "./CustomerHelp";
import AddCustomerHelp from "./AddCustomerHelp";

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
				<Route path="/" element={<Home />} />
				{/* Use 'Routes' instead of 'Switch' */}
				<Route path="/accountlist" element={<AccountList />} />
				<Route path="/addAccount" element={<AddAccount />} />
				<Route path="/addUser" element={<AddUser />} />
				<Route path="/addLoan" element={<AddLoan />} />
				<Route path="/loanlist" element={<LoanList />} />
				<Route path="/userList" element={<UserList />} />
				<Route path="/depositMoney" element={<DepositMoney />} />
				<Route path="/withdrawMoney" element={<WithdrawMoney />} />
				<Route path="/customerHelp" element={<CustomerHelp />} />
				<Route path="/addCustomerHelp" element={<AddCustomerHelp />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
		</Router>
	);
};

export default AppRouter;
