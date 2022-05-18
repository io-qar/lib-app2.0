const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
	User.create({
		username: req.body.username,
		password: bcrypt.hashSync(req.body.password, 8),
		roles: req.body.roles
	}).then(user => {
		if (req.body.roles) {
			Role.findAll({
				where: {
					name: {
						[Op.or]: req.body.roles
					}
				}
			}).then(roles => {
				user.setRoles(roles).then(() => {
					res.send({
						message: 'Пользователь был успешно зарегистрирован!'
					});
				});
			});
		} else {
			user.setRoles([3]).then(() => {
				res.send({
					message: "Пользователь был успешно зарегистрирован!"
				});
			});
		}
	}).catch(err => {
		res.status(500).send({
			message: err.message
		});
	});
};

exports.signin = (req, res) => {
	User.findOne({
		where: {
			username: req.body.username
		}
	}).then(user => {
		if (!user) {
			return res.status(404).send({
				message: "Пользователь не найден!"
			});
		}

		var passwordIsValid = bcrypt.compareSync(
			req.body.password,
			user.password
		);

		if (!passwordIsValid) {
			return res.status(401).send({
				accessToken: null,
				message: "Неправильный пароль!"
			});
		}

		var token = jwt.sign(
			{
				id: user.id
			}, 
			config.secret,
			{
				expiresIn: 86400
			}
		);

		var authorities = [];

		user.getRoles().then(roles => {
			for (let i = 0; i < roles.length; i++) {
				authorities.push("ROLE_" + roles[i].name.toUpperCase());
			}
			
			res.status(200).send({
				id: user.id,
				username: user.username,
				roles: authorities,
				accessToken: token
			});
		});
	}).catch(err => {
		res.status(500).send({
			message: err.message
		});
	});
};