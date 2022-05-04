import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/tutorials/add-tutorial.component";
import Tutorial from "./components/tutorials/tutorial.component";
import TutorialsList from "./components/tutorials/tutorials-list.component";

import AddBook from "./components/books/add-book.components";
import Book from "./components/books/book.component";
import BooksList from "./components/books/books-list.component";

class App extends Component {
	render() {
		return (
			<div>
				<nav className="navbar navbar-expand navbar-dark bg-dark">
					<Link to={"/tutorials"} className="navbar-brand">
						bezKoder
					</Link>
					<div className="navbar-nav mr-auto">
						<li className="nav-item">
							<Link to={"/tutorials"} className="nav-link">
								Tutorials
							</Link>
						</li>
			<li className="nav-item">
							<Link to={"/books"} className="nav-link">
								Books
							</Link>
						</li>
						<li className="nav-item">
							<Link to={"/add"} className="nav-link">
								Add
							</Link>
						</li>
					</div>
				</nav>

				<div className="container mt-3">
					<Switch>
						{/* <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
						<Route exact path="/add" component={AddTutorial} />
						<Route path="/tutorials/:id" component={Tutorial} /> */}

						<Route exact path={["/", "/books"]} component={BooksList} />
						<Route exact path="/add" component={AddBook} />
						<Route path="/books/:id" component={Book} />
					</Switch>
				</div>
			</div>
		);
	}
}

export default App;