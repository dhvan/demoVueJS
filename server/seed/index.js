const {
  sequelize,
  User,
  Employees,
  EmployeeTeams,
  Teams
} = require('../src/models')

const Promise = require('bluebird')
const users = require('./users.json')
const employees = require('./employees.json')
const employeeTeams = require('./EmployeeTeams.json')
const teams = require('./Team.json')

sequelize.sync({force: true})
  .then(async function () {
    await Promise.all(
      users.map(user => {
        User.create(user)
      })
    )

    await Promise.all(
      employees.map(employee => {
        Employees.create(employee)
      })
    )

    await Promise.all(       
        teams.map(team => {
          Teams.create(team)
      })
    )

    await Promise.all(       
      employeeTeams.map(employeeTeam => {
        EmployeeTeams.create(employeeTeam)
      })
    )

  }
)
