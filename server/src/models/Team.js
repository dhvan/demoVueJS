module.exports = (sequelize, DataTypes) => {
  const Teams = sequelize.define('Teams', {
    Name: DataTypes.STRING,
    Dept: DataTypes.INTEGER
  })

  Teams.associate = function (models) {
    Teams.belongsToMany(models.Employees, {
      through: 'EmployeeTeams',
      foreignKey: 'TeamId'
    })
  }

  return Teams
}
