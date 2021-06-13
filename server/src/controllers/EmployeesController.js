const { Employees } = require('../models')
const { Teams } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      let employees = await Employees.findAll({
        limit: 1500
      })

      let employeeList = []
      for (let employee of employees) {
        const data = await employee.getTeams({ raw: true })
        let teams = []
        data.forEach((e) => {
          teams.push({ id: e.id, name: e.Name })
        })

        employeeList.push({
          id: employee.id,
          Name: employee.Name,
          Chucvu: employee.Chucvu,
          Dept: employee.Dept,
          Manager: employee.Manager,
          Teams: teams
        })
      }

      res.send(employeeList)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the empoyees'
      })
    }
  },

  async show (req, res) {
    try {
      const employee = await Employees.findById(req.params.employeeId)
      employee.getTeams({ attributes: ['name'] }).then((data) => {
        data.forEach(e => {
          console.log(JSON.stringify(e))
        })
      })
      res.send(employee)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to show the employee'
      })
    }
  },

  async post (req, res) {
    try {
      const param = req.body
      const teamIds = req.body.Team.map(item => item.teamId)
      if (param.Name && param.Chucvu && param.Dept && param.Manager) {
        const employee = await Employees.create({
          Name: param.Name,
          Chucvu: param.Chucvu,
          Dept: param.Dept,
          Manager: param.Manager,
          Teams: teamIds
        }, {
          include: [Teams]
        })
        res.send(employee)
      }
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to create the employee'
      })
    }
  },

  async put (req, res) {
    try {
      const teamIds = req.body.Team.map(item => item.teamId)
      await Employees.update(req.body, {
        where: {
          id: req.params.employeeId
        }})
      let temp = []
      for (let i = 0; i < teamIds.length; i++) {
        const t = await Teams.findById(teamIds[i])
        temp.push(t)
      }
      const employee = await Employees.findById(req.body.employeeId)
      employee.setTeams(temp)
      employee.save()
      res.send(employee)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to update the employee'
      })
    }
  },

  async remove (req, res) {
    console.log(req.body.employeeId)
    try {
      const employee = await Employees.findOne({
        where: {
          id: req.body.employeeId
        }
      })
      await employee.destroy()
      res.send(employee)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to update the employee'
      })
    }
  }
}
