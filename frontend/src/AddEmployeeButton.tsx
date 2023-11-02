import React from 'react';
import axios from 'axios';

interface NewEmployeeData {
  id: number;
  name: string;
  layer: number;
  employeeType: number;
  parentId: number;
  programmingLanguage: number;
}

interface AddEmployeeButtonProps {
  addEmployee: (newEmployeeData: NewEmployeeData) => void;
}

const AddEmployeeButton = ({ addEmployee }: AddEmployeeButtonProps) => {
  const employeeData = {
    name: 'John Doe',
    layer: 2,
    type: 1, 
    department: 1,
    programmingLanguage: 0,
    parentId: 1,
  };

  const createEmployee = async () => {
    try {
      const response = await axios.post<NewEmployeeData>('http://localhost:3000/api/employees', employeeData);
      addEmployee({
        id: response.data.id,
        name: response.data.name,
        layer: response.data.layer,
        employeeType: response.data.employeeType,
        parentId: employeeData.parentId,
        programmingLanguage: employeeData.programmingLanguage,
      });
    } catch (error) {
      console.error('Error creating employee', error);
    }
  };
  

  return (
    <button onClick={createEmployee}>
      Add Employee
    </button>
  );
};

export default AddEmployeeButton;
