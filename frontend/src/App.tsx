// App.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddEmployeeButton from './AddEmployeeButton';
import EmployeeGrid from './EmployeeGrid';

interface Employee {
  id: number;
  name: string;
  layer: number;
  employeeType: number;
}

interface NewEmployeeData {
  name: string;
  layer: number;
  employeeType: number;
  parentId: number
  programmingLanguage: number;
}

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get<Employee[]>('http://localhost:3000/api/employees');
      setEmployees(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching employees', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const addEmployee = async (newEmployeeData: NewEmployeeData) => {
    try {
      await axios.post('http://localhost:3000/api/employees', newEmployeeData);
      await fetchEmployees();
    } catch (error) {
      console.error('Error adding employee', error);
    }
  };

  return (
    <div>
      <header>
        <h1>Company Structure</h1>
      </header>
      <main>
        <AddEmployeeButton addEmployee={addEmployee} />
        <EmployeeGrid employees={employees} />
      </main>
    </div>
  );
}

export default App;
