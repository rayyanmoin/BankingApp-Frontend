// NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ loggedInUser }) => {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/questionlist">Account List</Link>
				</li>
				<li>
					<Link to="/loanlist">Loan List</Link>
				</li>
				<li>
					<Link to="/userlist">User List</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
