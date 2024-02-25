// NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ loggedInUser }) => {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/userlist">User List</Link>
				</li>
				<li>
					<Link to="/addUser"> Add User</Link>
				</li>
				<li>
					<Link to="/accountlist">Account List</Link>
				</li>
				<li>
					<Link to="/addAccount">Add Account</Link>
				</li>
				<li>
					<Link to="/loanlist">Loan List</Link>
				</li>
				<li>
					<Link to="/addLoan">Add Loan</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
