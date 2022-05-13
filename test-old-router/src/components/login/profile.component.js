import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import BooksList from "../books/books-list.component";

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: AuthService.getCurrentUser()
		};
	}

	render() {
		const { currentUser } = this.state;

		return (
			<div className="container">
				<header className="jumbotron">
					<h3>
						Профиль пользователя
						<strong> {currentUser.username}</strong>
					</h3>
				</header>
				<p>
					<strong>Токен:</strong>{" "}
					{currentUser.accessToken.substring(0, 20)}...{" "}
					{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
				</p>
				<p>
					<strong>ID:</strong>{" "}
					{currentUser.id}
				</p>
				<strong>Роли:</strong>
				<ul>
					{currentUser.roles && currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
				</ul>
			</div>
		);
	}
}