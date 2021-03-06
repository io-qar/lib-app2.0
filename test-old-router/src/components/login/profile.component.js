import React, { Component } from "react";
import AuthService from "../../services/auth.service";

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
					<strong>Ваш токен:</strong>{" "}
					{currentUser.accessToken.substring(0, 20)}...{" "}
					{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
				</p>
				<p>
					<strong>ID пользователя:</strong>{" "}
					{currentUser.id}
				</p>
				<strong>Роли пользователя:</strong>
				<ul>
					{currentUser.roles && currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
				</ul>
			</div>
		);
	}
}