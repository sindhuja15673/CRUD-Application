const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

let employees = [];

app.post('/api/employees', (req, res) => {
  const employee = { id: employees.length + 1, ...req.body };
  employees.push(employee);
  res.status(201).json(employee);
});

// Read all employees
app.get('/api/employees', (req, res) => {
  res.json(employees);
});

// Read one employee
app.get('/api/employees/:id', (req, res) => {
  const employee = employees.find(emp => emp.id === parseInt(req.params.id));
  if (!employee) return res.status(404).json({ message: 'Employee not found' });
  res.json(employee);
});

// Update an employee
app.put('/api/employees/:id', (req, res) => {
  const employee = employees.find(emp => emp.id === parseInt(req.params.id));
  if (!employee) return res.status(404).json({ message: 'Employee not found' });

  Object.assign(employee, req.body);
  res.json(employee);
});

// Delete an employee
app.delete('/api/employees/:id', (req, res) => {
  employees = employees.filter(emp => emp.id !== parseInt(req.params.id));
  res.json({ message: 'Employee is deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

