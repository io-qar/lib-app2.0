import React, { Component } from "react";
import BookDataService from "../../services/book.service";

export default class AddBook extends Component {
	constructor(props) {
		super(props);
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeAuthor = this.onChangeAuthor.bind(this);
		this.onChangeYear = this.onChangeYear.bind(this);
		this.onChangeVersion = this.onChangeVersion.bind(this);
		this.onChangePublisherName = this.onChangePublisherName.bind(this);

		this.saveBook = this.saveBook.bind(this);
		this.newBook = this.newBook.bind(this);
	
		this.state = {
			id: null,
			name: "",
			author: "",
			year: 2022,
			version: 1,
			publisherName: ""
		};
	}

	onChangeName(e) {
		this.setState({
			name: e.target.value
		});
	}

	onChangeAuthor(e) {
		this.setState({
			author: e.target.value
		});
	}

	onChangeYear(e) {
		this.setState({
			year: e.target.value
		});
	}

	onChangeVersion(e) {
		this.setState({
			version: e.target.value
		});
	}

	onChangePublisherName(e) {
		this.setState({
			publisherName: e.target.value
		});
	}

	saveBook() {
		var data = {
			name: this.state.name,
			author: this.state.author,
			version: this.state.version,
			year: this.state.year,
			publisherName: this.state.publisherName
		};

		BookDataService.create(data).then(response => {
			this.setState({
				id: response.data.id,
				name: response.data.name,
				author: response.data.author,
				version: response.data.version,
				year: response.data.year,
				publisherName: response.data.publisherName
			});
			console.log(response.data);
		}).catch(e => {
			console.log(e);
		});
	}

	newBook() {
		this.setState({
			id: null,
			name: "",
			author: "",
			version: 1,
			year: 2022,
			publisherName: "",
			submitted: false
		});
	}

	render() {
		return (
			<div className="submit-form">
				{this.state.submitted ? (
					<div>
						<h4>Книга была учпешно добавлена!</h4>
						<button className="btn btn-success" onClick={this.newBook}>Добавить</button>
					</div>
				) : (
					<div>
						<div className="form-group">
							<label htmlFor="name">Название</label>
							<input
								type="text"
								className="form-control"
								id="name"
								required
								value={this.state.name}
								onChange={this.onChangeName}
								name="name"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="author">Автор</label>
							<input
								type="text"
								className="form-control"
								id="author"
								required
								value={this.state.author}
								onChange={this.onChangeAuthor}
								name="author"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="version">Номер издания</label>
							<input
								type="text"
								className="form-control"
								id="version"
								required
								value={this.state.version}
								onChange={this.onChangeVersion}
								name="version"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="year">Год издания</label>
							<input
								type="text"
								className="form-control"
								id="year"
								required
								value={this.state.year}
								onChange={this.onChangeYear}
								name="year"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="publisherName">Издательство</label>
							<input
								type="text"
								className="form-control"
								id="publisherName"
								required
								value={this.state.publisherName}
								onChange={this.onChangePublisherName}
								name="publisherName"
							/>
						</div>
						<button onClick={this.saveBook} className="btn btn-success">Добавить</button>
					</div>
				)}
			</div>
		);
  }
}