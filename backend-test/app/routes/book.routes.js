module.exports = app => {
	const books = require("../controllers/book.controller.js");
	var router = require("express").Router();

	router.post("/", books.create);

	router.get("/", books.findAll);

	router.get("/:id", books.findOne);

	router.get("/rented", books.findAllRented);

	router.put("/:id", books.update);

	router.delete("/:id", books.delete);

	router.delete("/", books.deleteAll);
	app.use('/api/books', router);
};