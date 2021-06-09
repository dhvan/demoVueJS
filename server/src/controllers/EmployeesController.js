const {Employees} = require('../models')

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
    console.log('ssss')
    try {
      const employee = await Employees.create(req.body)
      console.log('abc', employee)
      res.send(employee)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to create the employee'
      })
    }
  },

  async put (req, res) {
    console.log('#AAAAAAAA', req)
    try {
      await Employees.update(req.body, {
        where: {
          id: req.params.employeeId
        }
      })
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to update the employee'
      })
    }
  }
}
