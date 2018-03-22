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
		account_balance: {
			type: DataTypes.INTEGER,
			defaultValue: 100000,
		},
		// stocks_owned: {
		// 	type: DataTypes.JSON
		// }
	})

	Users.associate = models => {
		Users.hasMany(models.Ledger, {
			onDelete: "cascade"
		})
	}

	return Users
}


