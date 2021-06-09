module.exports = (sequelize, DataTypes) => {
  const Employees = sequelize.define('Employees', {
    Name: DataTypes.STRING,
    Chucvu: DataTypes.STRING,
    Dept: DataTypes.INTEGER,
    Manager: DataTypes.STRING
  })

  Employees.associate = function (models) {
    Employees.belongsToMany(models.Teams, {
      through: 'EmployeeTeams',
      foreignKey: 'EmployeeId'
    })
  }

  return Employees
}
