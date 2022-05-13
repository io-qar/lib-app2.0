import React, { Component } from "react";
import UserService from "../../services/user.service";
import image from "../../images/account_circle_FILL0_wght400_GRAD0_opsz48.svg"
import BooksList from "../books/books-list.component";

export default class BoardUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: ""
		};
	}

	componentDidMount() {
		UserService.getUserBoard().then(
			response => {
				this.setState({
					content: response.data
				});
			},
			error => {
				this.setState({
					content: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
				});
			}
		);
	}

	render() {
		return (
			<div className="container">
				<header className="jumbotron">
					<h3>{this.state.content}</h3>
				</header>
			</div>
		);
	}
}