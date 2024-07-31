import React, { useEffect, useState } from 'react';

const AddEmployee = ({ onRequestClose, currentEmployee, onSubmit }) => {
  const [employeeDetails, setEmployeeDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    salary: '',
    date: ''
  });

  useEffect(() => {
    if (currentEmployee) {
      setEmployeeDetails(currentEmployee);
    }
  }, [currentEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeDetails({
      ...employeeDetails,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(employeeDetails);
    setEmployeeDetails({
      firstName: '',
      lastName: '',
      email: '',
      salary: '',
      date: ''
    });
  };

  return (
    <div className='overlay'>
    <div className='modal'>

      <h2>{currentEmployee ? 'Edit Employee' : 'Add Employee'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='firstName'
          value={employeeDetails.firstName}
          onChange={handleChange}
          placeholder='First Name'
          required
        />
        <input
          type='text'
          name='lastName'
          value={employeeDetails.lastName}
          onChange={handleChange}
          placeholder='Last Name'
          required
        />
        <input
          type='email'
          name='email'
          value={employeeDetails.email}
          onChange={handleChange}
          placeholder='Email'
          required
        />
        <input
          type='number'
          name='salary'
          value={employeeDetails.salary}
          onChange={handleChange}
          placeholder='Salary'
          required
        />
        <input
          type='date'
          name='date'
          value={employeeDetails.date}
          onChange={handleChange}
          required
        />
        <button type='submit'>Submit</button>
        <button onClick={onRequestClose} type='button'>Cancel</button>
      </form>
    </div>
    </div>
  );
}

export default AddEmployee;
