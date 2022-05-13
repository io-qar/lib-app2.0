import React, { Component } from "react";
import BookDataService from "../../services/book.service";
import { Link } from "react-router-dom";

export default class BooksList extends Component {
	constructor(props) {
		super(props);
		this.onChangeSearchName = this.onChangeSearchName.bind(this);
		this.retrieveBooks = this.retrieveBooks.bind(this);
		this.refreshList = this.refreshList.bind(this);
		this.setActiveBook = this.setActiveBook.bind(this);
		this.removeAllBooks = this.removeAllBooks.bind(this);
		this.searchName = this.searchName.bind(this);

		this.state = {
			books: [],
			currentBook: null,
			currentIndex: -1,
			searchName: ""
		};
	}

	componentDidMount() {
		this.retrieveBooks();
	}

	onChangeSearchName(e) {
		const searchName = e.target.value;
		this.setState({
			searchName: searchName
		});
	}

	retrieveBooks() {
		BookDataService.getAll().then(response => {
			this.setState({
				books: response.data
			});
			console.log(response.data);
		}).catch(e => {
			console.log(e);
		});
	}

	refreshList() {
		this.retrieveBooks();
		this.setState({
			currentBook: null,
			currentIndex: -1
		});
	}

	setActiveBook(book, index) {
		this.setState({
			currentBook: book,
			currentIndex: index
		});
	}

	removeAllBooks() {
		BookDataService.deleteAll().then(response => {
			console.log(response.data);
			this.refreshList();
		}).catch(e => {
			console.log(e);
		});
	}

	searchName() {
		this.setState({
			currentBook: null,
			currentIndex: -1
		});

		BookDataService.findByName(this.state.searchName).then(response => {
			this.setState({
				books: response.data
			});
			console.log(response.data);
		}).catch(e => {
			console.log(e);
		});
	}

	render() {
		const { searchName, books, currentBook, currentIndex } = this.state;
		return (
			<div className="list row">
				<div className="col-md-8">
					<div className="input-group mb-3">
						<input
							type="text"
							className="form-control"
							placeholder="Введите название книги..."
							value={searchName}
							onChange={this.onChangeSearchName}
						/>
						<div className="input-group-append">
							<button
								className="btn btn-outline-secondary"
								type="button"
								onClick={this.searchName}
							>
								Поиск
							</button>
						</div>
					</div>
				</div>
				<div className="col-md-6">
					<h4>Список книг</h4>
					<ul className="list-group">
						{books && books.map((book, index) => (
							<li
								className={
									"list-group-item " + (index === currentIndex ? "active" : "")
								}
								onClick={
									() => this.setActiveBook(book, index)
								}
								key={index}
							>
								{book.name}
							</li>
						))}
					</ul>
					<button
						className="m-3 btn btn-sm btn-danger"
						onClick={this.removeAllBooks}
					>
						Удалить все книги
					</button>
				</div>
				<div className="col-md-6">
					{currentBook ? (
						<div>
							<h4>Книга</h4>
							<div>
								<label>
									<strong>Название:</strong>
								</label>
								{" "}
								{currentBook.name}
							</div>
							<div>
								<label>
									<strong>Автор:</strong>
								</label>
								{" "}
								{currentBook.author}
							</div>
							<div>
								<label>
									<strong>Год издания:</strong>
								</label>
								{" "}
								{currentBook.year}
							</div>
							<div>
								<label>
									<strong>Номер издания:</strong>
								</label>
								{" "}
								{currentBook.version}
							</div>
							<div>
								<label>
									<strong>Имя издательства:</strong>
								</label>
								{" "}
								{currentBook.publisherName}
							</div>
							<Link
								to={"/books/" + currentBook.id}
								className="badge badge-warning"
							>
								Изменить
							</Link>
						</div>
					) : (
						<div>
							<br/>
							<p>Пожалуйста, выберите книгу...</p>
						</div>
					)}
				</div>
			</div>
		);
	}
}