const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const EmployeeController = require('./controllers/EmployeesController')

// const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {
  console.log('aa')
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.post('/login',
    AuthenticationController.login)

  app.get('/employees',
    EmployeeController.index)
  app.get('/employees/:employeeId',
    EmployeeController.show)
  app.put('/employees/:employeeId',
    EmployeeController.put)
  app.post('/employees',
    EmployeeController.post)
}
