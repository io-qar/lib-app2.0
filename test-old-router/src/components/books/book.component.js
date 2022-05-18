import React, { Component } from "react";
import BookDataService from "../../services/book.service";
import AuthService from "../../services/auth.service";

export default class Book extends Component {
	constructor(props) {
		super(props);
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeAuthor = this.onChangeAuthor.bind(this);
		this.onChangeYear = this.onChangeYear.bind(this);
		this.onChangeVersion = this.onChangeVersion.bind(this);
		this.onChangePublisherName = this.onChangePublisherName.bind(this);

		this.getBook = this.getBook.bind(this);

		this.updateRented = this.updateRented.bind(this)
		this.updateBook = this.updateBook.bind(this);
		this.deleteBook = this.deleteBook.bind(this);

		this.state = {
			currentBook: {
				id: null,
				name: "",
				author: "",
				year: null,
				version: null,
				publisherName: "",
				rented: false
			},
			showModeratorBoard: false,
			showAdminBoard: false,
			currentUser: undefined,
			message: ""
		};
	}

	componentDidMount() {
		this.getBook(this.props.match.params.id);

		const user = AuthService.getCurrentUser();

		if (user) {
			this.setState({
				currentUser: user,
				showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
				showAdminBoard: user.roles.includes("ROLE_ADMIN"),
			});
		}
	}

	onChangeName(e) {
		const name = e.target.value;
		this.setState(function(prevState) {
			return {
				currentBook: {
					...prevState.currentBook,
					name: name
				}
			};
		});
	}

	onChangeAuthor(e) {
		const author = e.target.value;
		this.setState(prevState => ({
			currentBook: {
				...prevState.currentBook,
				author: author
			}
		}));
	}

	onChangeYear(e) {
		const year = e.target.value;
		this.setState(prevState => ({
			currentBook: {
				...prevState.currentBook,
				year: year
			}
		}));
	}

	onChangeVersion(e) {
		const version = e.target.value;
		this.setState(prevState => ({
			currentBook: {
				...prevState.currentBook,
				version: version
			}
		}));
	}

	onChangePublisherName(e) {
		const publisherName = e.target.value;
		this.setState(prevState => ({
			currentBook: {
				...prevState.currentBook,
				publisherName: publisherName
			}
		}));
	}

	getBook(id) {
		BookDataService.get(id).then(response => {
			this.setState({
				currentBook: response.data
			});
			console.log(response.data);
		}).catch(e => {
			console.log(e);
		});
	}

	updateRented(status) {
		var data = {
			id: this.state.currentBook.id,
			name: this.state.currentBook.name,
			author: this.state.currentBook.author,
			year: this.state.currentBook.year,
			version: this.state.currentBook.version,
			publisherName: this.state.currentBook.publisherName,
			rented: status
		};

		BookDataService.update(this.state.currentBook.id, data).then(response => {
			this.setState(prevState => ({
				currentBook: {
					...prevState.currentBook,
					rented: status
				}
			}));
			console.log(response.data);
		}).catch(e => {
			console.log(e);
		});
	}

	updateBook() {
		BookDataService.update(
			this.state.currentBook.id,
			this.state.currentBook
		).then(response => {
			console.log(response.data);
			this.setState({
				message: "Книга была успешно обновлена!"
			});
		}).catch(e => {
			console.log(e);
		});
	}

	deleteBook() {    
		BookDataService.delete(this.state.currentBook.id).then(response => {
			console.log(response.data);
			this.props.history.push('/books')
		}).catch(e => {
			console.log(e);
		});
	}

	render() {
		const {currentBook, showModeratorBoard, showAdminBoard} = this.state;
		return (
			<div>
				{currentBook ? (
					<div className="edit-form">
						<h4>Книга</h4>
						<form>
							<div className="form-group">
								<label htmlFor="name">Название книги</label>
								<input
									type="text"
									className="form-control"
									id="name"
									value={currentBook.name}
									onChange={this.onChangeName}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="author">Автор книги</label>
								<input
									type="text"
									className="form-control"
									id="author"
									value={currentBook.author}
									onChange={this.onChangeAuthor}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="version">Номер издания книги</label>
								<input
									type="text"
									className="form-control"
									id="version"
									value={currentBook.version}
									onChange={this.onChangeVersion}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="publisherName">Имя издательства</label>
								<input
									type="text"
									className="form-control"
									id="publisherName"
									value={currentBook.publisherName}
									onChange={this.onChangePublisherName}
								/>
							</div>
							<div className="form-group">
								<label>
									<strong>Статус:</strong>
								</label>
								{currentBook.rented ? " Занята" : " Свободна"}
							</div>
						</form>
						{showModeratorBoard && (
							<div>
								{currentBook.rented ? (
									<button
										className="badge badge-primary mr-2"
										onClick={
											() => this.updateRented(false)
										}
									>
										Отдать книгу библиотеке
									</button>) : (
									<button
										className="badge badge-primary mr-2"
										onClick={
											() => this.updateRented(true)
										}
									>
										Взять книгу из библиотеки
									</button>)
								}
							</div>)
						}
						{showAdminBoard && (
							<button
								className="badge badge-danger mr-2"
								onClick={this.deleteBook}
							>
								Удалить
							</button>
						)}
						{showModeratorBoard && (
							<button
								type="submit"
								className="badge badge-success"
								onClick={this.updateBook}
							>
								Обновить
							</button>
						)}
						<p>{this.state.message}</p>
					</div>
				) : (
					<div>
						<br/>
						<p>Пожалуйста, выберите книгу</p>
					</div>
				)}
			</div>
		);
	}
}