module.exports = (sequelize, Sequelize) => {
	const Book = sequelize.define("book", {
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
		rented: {
			type: Sequelize.BOOLEAN
		}
	});
	return Book;
}