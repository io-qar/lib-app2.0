import React, { Component } from "react";
import BookDataService from "../../services/book.service";

export default class Book extends Component {
	constructor(props) {
		super(props);
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeAuthor = this.onChangeAuthor.bind(this);
		this.onChangeYear = this.onChangeYear.bind(this);
		this.onChangeVersion = this.onChangeVersion.bind(this);
		this.onChangePublisherName = this.onChangePublisherName.bind(this);

		this.getBook = this.getBook.bind(this);

		this.updateName = this.updateName.bind(this);
		this.updateAuthor = this.updateAuthor.bind(this);
		this.updateYear = this.updateYear.bind(this);
		this.updateVersion = this.updateVersion.bind(this);

		this.updateBook = this.updateBook.bind(this);
		this.deleteBook = this.deleteBook.bind(this);

		this.state = {
			currentBook: {
				id: null,
				name: "",
				author: "",
				year: null,
				version: null,
				publisherName: ""
			},
			message: ""
		};
	}

	componentDidMount() {
		this.getBook(this.props.match.params.id);
	}

	onChangeName(e) {
		const name = e.target.value;
		this.setState(function(prevState) {
			return {
				currentBook: {
					...prevState.currentTutorial,
					name: name
				}
			};
		});
	}

	onChangeAuthor(e) {
		const author = e.target.value;
		this.setState(prevState => ({
			currentBook: {
				...prevState.currentTutorial,
				author: author
			}
		}));
	}

	onChangeYear(e) {
		const year = e.target.value;
		this.setState(prevState => ({
			currentBook: {
				...prevState.currentTutorial,
				year: year
			}
		}));
	}

	onChangeVersion(e) {
		const version = e.target.value;
		this.setState(prevState => ({
			currentBook: {
				...prevState.currentTutorial,
				version: version
			}
		}));
	}

	onChangePublisherName(e) {
		const publisherName = e.target.value;
		this.setState(prevState => ({
			currentBook: {
				...prevState.currentTutorial,
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

	// updatePublished(status) {
	// 	var data = {
	// 		id: this.state.currentTutorial.id,
	// 		title: this.state.currentTutorial.title,
	// 		description: this.state.currentTutorial.description,
	// 		published: status
	// 	};

	// 	TutorialDataService.update(this.state.currentTutorial.id, data)
	// 		.then(response => {
	// 			this.setState(prevState => ({
	// 				currentTutorial: {
	// 					...prevState.currentTutorial,
	// 					published: status
	// 				}
	// 			}));
	// 			console.log(response.data);
	// 		})
	// 		.catch(e => {
	// 			console.log(e);
	// 		});
	// }

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
			this.props.history.push('/tutorials')
		}).catch(e => {
			console.log(e);
		});
	}

	render() {
		const { currentBook} = this.state;
		return (
			<div>
				{currentBook ? (
					<div className="edit-form">
						<h4>Книга</h4>
						<form>
							<div className="form-group">
								<label htmlFor="name">Название</label>
								<input
									type="text"
									className="form-control"
									id="name"
									value={currentBook.name}
									onChange={this.onChangeName}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="author">Автор</label>
								<input
									type="text"
									className="form-control"
									id="author"
									value={currentBook.author}
									onChange={this.onChangeAuthor}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="version">Номер издания</label>
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
						</form>

						<button
							className="badge badge-danger mr-2"
							onClick={this.deleteBook}
						>
							Удалить
						</button>
						<button
							type="submit"
							className="badge badge-success"
							onClick={this.updateBook}
						>
							Обновить
						</button>
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