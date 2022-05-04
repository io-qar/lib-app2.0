module.exports = (sequelize, Sequelize) => {
	const Book = sequelize.define("Book", {
		name: {
			type: Sequelize.STRING
		},
		author: {
			type: Sequelize.STRING
		},
		year: {
			type: Sequelize.INTEGER
		},
		version: {
			type: Sequelize.INTEGER
		},
		publisherName: {
			type: Sequelize.STRING
		},
	});
	return Book;
}