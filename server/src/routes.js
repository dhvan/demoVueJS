const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const EmployeeController = require('./controllers/EmployeesController')

module.exports = (app) => {
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
  app.post('/employees/remove/:employeeId',
    EmployeeController.remove)
}
