import axios from 'axios';

const API_URL = 'http://localhost:5000/api/employees';

const getEmployees = () => axios.get(API_URL);
const getEmployee = (id) => axios.get(`${API_URL}/${id}`);
const createEmployee = (employee) => axios.post(API_URL, employee);
const updateEmployee = (id, employee) => axios.put(`${API_URL}/${id}`, employee);
const deleteEmployee = (id) => axios.delete(`${API_URL}/${id}`);

export default {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
};
