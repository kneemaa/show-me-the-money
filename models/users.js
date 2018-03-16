module.exports = (sequelize, DataTypes) => {
	var Users = sequelize.define("Users", {
		first_name: {
			type: DataTypes.STRING,
		},
		last_name: {
			type: DataTypes.STRING
		},
		email: {
			type: DataTypes.STRING,
			validate: {
				isEmail: true
			}
		},
		stocks_owned: {
			type: DataTypes.JSON
		}
	})



	return Users
}


