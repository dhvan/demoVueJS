const { EmployeeTeams } = require('../models')

module.exports = {

  async post (req, res) {
    try {
      const paramTeam = {
        TeamId: req.params.teamId,
        EmployeeId: req.params.employeeId
      }
      const team1 = await EmployeeTeams.create(paramTeam)
      res.send(team1)

      throw new Error()
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to create the employee'
      })
    }
  }
}
