
interface Employee {
  id: number;
  name: string;
  layer: number;
  employeeType: number;
}

interface EmployeeGridProps {
  employees: Employee[];
}

const EmployeeGrid = ({ employees } : EmployeeGridProps) => {
  return (
    <div className="employee-grid">
      {employees.map(employee => (
        <div key={employee.id} className="employee">
          <p>Name: {employee.name}</p>
          <p>ID: {employee.id}</p>
          <p>Layer: {employee.layer}</p>
          <p>Employee type: {employee.employeeType}</p>
        </div>
      ))}
    </div>
  );
};

export default EmployeeGrid;