import React, { useState,useEffect } from 'react';
import AddEmployee from './AddEmployee';
import employeeServices from './services/employeeServices';
import './App.css';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [modelIsOpen, setModelIsOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const { data } = await employeeServices.getEmployees();
    setEmployees(data);
  };

  const openModel = (employee = null) => {
    setModelIsOpen(true);
    setCurrentEmployee(employee);
  };

  const closeModel = () => {
    setCurrentEmployee(null);
    setModelIsOpen(false);
  };

  const handleFormSubmit = async (employee) => {
    if (currentEmployee) {
      await employeeServices.updateEmployee(currentEmployee.id, employee);
    } else {
      await employeeServices.createEmployee(employee);
    }
    fetchEmployees();
    closeModel();
  };

  const deleteEmployee = async (id) => {
    await employeeServices.deleteEmployee(id);
    fetchEmployees();
  };


  return (
    <div className='app'>
      <h1 className='title'>Employee Management Software</h1>
      <button className='add' onClick={() => openModel()}>Add Employee</button>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, id) => (
            <tr className='list' key={id}>
              <td>{id+1}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>{employee.salary}</td>
              <td>{employee.date}</td>
              <td>
                <button onClick={() => openModel(employee)}>Edit</button>
                <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modelIsOpen && (
        <AddEmployee
          onRequestClose={closeModel}
          onSubmit={handleFormSubmit}
          currentEmployee={currentEmployee}
        />
      )}
    </div>
  );
};

export default App;


