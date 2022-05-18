const db = require("../models");
const Book = db.books;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
	if (!req.body.name) {
		res.status(400).send({
			message: "Имя не может быть пустым!"
		});

		return;
	}
	
	const book = {
		name: req.body.name,
		author: req.body.author,
		year: req.body.year,
		version: req.body.version,
		publisherName: req.body.publisherName,
		rented: req.body.rented ? req.body.rented : false
	};
	
	Book.create(book).then(data => {
		res.send(data);
	}).catch(err => {
		res.status(500).send({
			message:
				err.message || "Ошибка во время создания книги (500)"
		});
	});
};

exports.findAll = (req, res) => {
	const name = req.query.name;

	var condition = name ? {
		name: {
			[Op.iLike]: `%${name}%`
		}
	} : null;

	Book.findAll({ where: condition }).then(data => {
		res.send(data);
	}).catch(err => {
		res.status(500).send({
			message:
				err.message || "Ошибка во время поиска книг"
		});
	});
};

exports.findOne = (req, res) => {
	const id = req.params.id;

	Book.findByPk(id).then(data => {
		if (data) {
			res.send(data);
		} else {
			res.status(404).send({
				message: `Нельзя найти книгу с ID ${id}`
			});
		}
	}).catch(err => {
		res.status(500).send({
			message: "Ошибка во время поиска книги с ID " + id
		});
	});
};

exports.update = (req, res) => {
	const id = req.params.id;

	Book.update(req.body, {
		where: {
			id: id
		}
	}).then(num => {
		if (num == 1) {
			res.send({
				message: "Книга была успешно обновлена!"
			});
		} else {
			res.send({
				message: `Нельзя обновить книгу с ID ${id}. Может быть Книга не была найдена или req.body оказался пустым!`
			});
		}
	}).catch(err => {
		res.status(500).send({
			message: "Произошла ошибка во время обновления книги с ID " + id
		});
	});
};

exports.delete = (req, res) => {
	const id = req.params.id;

	Book.destroy({
		where: {
			id: id
		}
	}).then(num => {
		if (num == 1) {
			res.send({
				message: "Книга была успешно удалена!"
			});
		} else {
			res.send({
				message: `Невозможно удалить книгу с ID ${id}. Возможно, её просто не существует!`
			});
		}
	}).catch(err => {
		res.status(500).send({
			message: "Невозможно удалить книгу с ID " + id
		});
	});
};

exports.deleteAll = (req, res) => {
	Book.destroy({
		where: {},
		truncate: false
	}).then(nums => {
		res.send({
			message: `${nums} - столько книг было успешно удалено!`
		});
	}).catch(err => {
		res.status(500).send({
			message:
				err.message || "Произошла неизвестная ошибка."
		});
	});
};

exports.findAllRented = (req, res) => {
	Book.findAll({
		where: {
			rented: true
		}
	}).then(data => {
		res.send(data);
	}).catch(err => {
		res.status(500).send({
			message:
				err.message || "Произошла некоторая ошибка"
		});
	});
};