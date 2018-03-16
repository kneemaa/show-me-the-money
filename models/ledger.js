module.exports = (sequelize, DataTypes) => {
	var Ledger = sequelize.define("Ledger", {
		purchase_price: {
			type: DataTypes.INTEGER
		},
		stock_count: {
			type: DataTypes.INTEGER
		},
		is_owned: {
			type: DataTypes.BOOLEAN
		},
		user_id: {
			type: DataTypes.INTEGER
		}
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
