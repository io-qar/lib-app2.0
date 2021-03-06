import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/auth.service";
import image from "../../images/account_circle_FILL0_wght400_GRAD0_opsz48.svg"

const required = value => {
	if (!value) {
		return (
			<div className="alert alert-danger" role="alert">
				Это поле обязательно!
			</div>
		);
	}
};

const vusername = value => {
	if (value.length < 3 || value.length > 20) {
		return (
			<div className="alert alert-danger" role="alert">
				Имя пользователя должно быть от 3 до 20 символов.
			</div>
		);
	}
};

const vpassword = value => {
	if (value.length < 6 || value.length > 40) {
		return (
			<div className="alert alert-danger" role="alert">
				Пароль должен должен быть от 6 до 40 символов.
			</div>
		);
	}
};

export default class Register extends Component {
	constructor(props) {
		super(props);
		this.handleRegister = this.handleRegister.bind(this);

		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.onChangeRoles = this.onChangeRoles.bind(this);

		this.state = {
			username: "",
			password: "",
			roles: [],
			successful: false,
			message: ""
		};
	}

	onChangeUsername(e) {
		this.setState({
			username: e.target.value
		});
	}

	onChangePassword(e) {
		this.setState({
			password: e.target.value
		});
	}

	onChangeRoles(e) {
		this.setState({
			roles: [
				e.target.value
			]
		});
	}

	handleRegister(e) {
		e.preventDefault();

		this.setState({
			message: "",
			successful: false
		});

		this.form.validateAll();

		if (this.checkBtn.context._errors.length === 0) {
			AuthService.register(this.state.username, this.state.password, this.state.roles).then(
				response => {
					this.setState({
						message: response.data.message,
						successful: true
					});
				},
				error => {
					const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
					
					this.setState({
						successful: false,
						message: resMessage
					});
				}
			);
		}
	}

	render() {
		return (
			<div className="col-md-12">
				<div className="card card-container">
					<img
						src={image}
						alt="profile-img"
						className="profile-img-card"
						style={{
							alignSelf: 'center'
						}}
					/>
					<Form
						onSubmit={this.handleRegister}
						ref={c => {
							this.form = c;
						}}
					>
						{!this.state.successful && (
							<div>
								<div className="form-group">
									<label htmlFor="username">Имя пользователя</label>
									<Input
										type="text"
										className="form-control"
										name="username"
										value={this.state.username}
										onChange={this.onChangeUsername}
										validations={[required, vusername]}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="password">Пароль</label>
									<Input
										type="password"
										className="form-control"
										name="password"
										value={this.state.password}
										onChange={this.onChangePassword}
										validations={[required, vpassword]}
									/>
								</div>
								<div className="form-group">
								<label htmlFor="roles">Роль</label>
									<Select
										className="form-control"
										name="roles[]"
										onChange={this.onChangeRoles}
										value={this.state.roles}
									>
										<option value={["admin"]}>Администратор</option>
										<option value={["moderator"]}>Модератор</option>
										<option value={["user"]}>Обычный пользователь</option>
									</Select>
									{/* <h1>You chose {this.state.roles}</h1> */}
								</div>
								<div className="form-group">
									<button className="btn btn-primary btn-block">Зарегистрироваться</button>
								</div>
							</div>
						)}
						{this.state.message && (
							<div className="form-group">
								<div
									className={this.state.successful ? "alert alert-success" : "alert alert-danger"}
									role="alert"
								>
									{this.state.message}
								</div>
							</div>
						)}
						<CheckButton
							style={{ display: "none" }}
							ref={c => {
								this.checkBtn = c;
							}}
						/>
					</Form>
				</div>
			</div>
		);
	}
}