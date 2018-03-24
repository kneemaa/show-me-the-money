module.exports = (sequelize, DataTypes) => {
	var Ledger = sequelize.define("Ledger", {
		symbol: {
			type: DataTypes.STRING
		},
		purchase_price: {
			type: DataTypes.FLOAT
		},
		stock_count: {
			type: DataTypes.INTEGER
		},
		is_owned: {
			type: DataTypes.BOOLEAN
		},
	})

	Ledger.associate = models => {
		Ledger.belongsTo(models.Users, {
			foreignKey: {
				allowNull: false
			}
		})
	}

	return Ledger
}
