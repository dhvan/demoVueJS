module.exports = (sequelize, DataTypes) => {
  const EmployeeTeams = sequelize.define('EmployeeTeams', {
    EmployeeId: DataTypes.INTEGER,
    TeamId: DataTypes.INTEGER
  })

  EmployeeTeams.associate = function (models) {
    EmployeeTeams.belongsTo(models.Teams)
    EmployeeTeams.belongsTo(models.Employees)
  }

  return EmployeeTeams
}
