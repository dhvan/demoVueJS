import Api from '@/services/Api'

export default {
  index () {
    return Api().get('employees')
  },
  show (employeeId) {
    return Api().get(`employees/${employeeId}`)
  },
  post (employee) {
    return Api().post('employees', employee)
  },
  put (employee) {
    return Api().put(`employees/${employee.employeeId}`, employee)    
  },
  remove (employeeId) {
    return Api().post(`employees/remove/${employeeId}`, {employeeId: employeeId})    
  }
}
