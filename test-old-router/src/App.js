import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddBook from "./components/books/add-book.components";
import Book from "./components/books/book.component";
import BooksList from "./components/books/books-list.component";
import AuthService from "./services/auth.service";
import Login from "./components/login/login.component";
import Register from "./components/login/register.component";
import Profile from "./components/login/profile.component";
import Home from "./components/home page/home.component";
import BoardUser from "./components/home page/board-user.component";
import BoardModerator from "./components/home page/board-moderator.component";
import BoardAdmin from "./components/home page/board-admin.component";

class App extends Component {
	constructor(props) {
		super(props);
		this.logOut = this.logOut.bind(this);
		this.state = {
			showModeratorBoard: false,
			showAdminBoard: false,
			currentUser: undefined
		};
	}

	componentDidMount() {
		const user = AuthService.getCurrentUser();

		if (user) {
			this.setState({
				currentUser: user,
				showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
				showAdminBoard: user.roles.includes("ROLE_ADMIN"),
			});
		}
	}

	logOut() {
		AuthService.logout();
	}

	render() {
		const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

		return (
			<div>
				<nav className="navbar navbar-expand navbar-dark bg-dark">
					<div className="navbar-nav mr-auto">
						<li className="nav-item">
							<Link to={"/home"} className="nav-link">
								Домой
							</Link>
						</li>
						{showModeratorBoard && (
							<div>
								{/* <li className="nav-item">
									<Link to={"/add"} className="nav-link">
										Добавить книгу
									</Link>									
								</li> */}
								{/* <li className="nav-item">
									<Link to={"/books"} className="nav-link">
										Список всех книг
									</Link>
								</li> */}
							</div>
						)}
						{showAdminBoard && (
							<div className="navbar-nav ml-auto">
								<li className="nav-item">
									<Link to={"/add"} className="nav-link">
										Добавить книгу
									</Link>
								</li>
								<li className="nav-item">
									<Link to={"/books"} className="nav-link">
										Список всех книг
									</Link>
								</li>
								<li className="nav-item">
									<Link to={"/books"} className="nav-link">
										Список всех взятых книг
									</Link>
								</li>
							</div>
						)}
						{currentUser && (
							<div className="navbar-nav ml-auto">
								<li className="nav-item">
									<Link to={"/books"} className="nav-link">
										Список всех книг
									</Link>
								</li>
							</div>
						)}
					</div>
					{currentUser ? (
						<div className="navbar-nav ml-auto">
							<li className="nav-item">
								<Link to={"/profile"} className="nav-link">
									{currentUser.username}
								</Link>
							</li>
							<li className="nav-item">
								<a href="/login" className="nav-link" onClick={this.logOut}>
									Выйти
								</a>
							</li>
						</div>
					) : (
						<div className="navbar-nav ml-auto">
							<li className="nav-item">
								<Link to={"/login"} className="nav-link">
									Войти
								</Link>
							</li>
							<li className="nav-item">
								<Link to={"/register"} className="nav-link">
									Зарегистрироваться
								</Link>
							</li>
						</div>
					)}
				</nav>

				<div className="container mt-3">
					<Switch>
						<Route exact path={["/", "/home"]} component={Home} />
						<Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />

						<Route exact path="/add" component={AddBook} />
						<Route path="/books/:id" component={Book} />
						<Route path="/books/" component={BooksList} />
					</Switch>
				</div>
			</div>
		);
	}
}

export default App;