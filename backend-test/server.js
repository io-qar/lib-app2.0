const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

var corsOptions = {
	origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
	res.json({ message: "Welcome!!!" });
});

const db = require("./app/models");
const Role = db.role;

db.sequelize.sync({ force: true }).then(() => {
	console.log("Drop and re-sync db.");
	initial();
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require("./app/routes/book.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Сервер запущен на порту ${PORT}.`);
});

function initial() {
	Role.create({
		id: 1,
		name: "user"
	});

	Role.create({
		id: 2,
		name: "moderator"
	});

	Role.create({
		id: 3,
		name: "admin"
	});
}