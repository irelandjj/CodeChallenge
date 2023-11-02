import { Request, Response } from 'express';
import { Employee, Developer, Manager, EmployeeType, ProgrammingLanguage, Departments } from './models';

const employees: { [key: number]: Employee } = {};
let employeeCounter = 0;

export const createEmployee = (req: Request, res: Response) => {
  const { name, layer, type, department, programmingLanguage, parentId } = req.body;
  const id = ++employeeCounter;
  let employee: Employee;
  const employeeType = parseInt(type);

  if (employeeType === EmployeeType.Manager) {
    employee = new Manager(id, name, layer, department);
  } else if (employeeType === EmployeeType.Developer) {
    employee = new Developer(id, name, layer, programmingLanguage);
  } else {
    return res.status(400).send('Invalid employee type');
  }

  if (parentId) {
    const parent = employees[parentId] as Manager;
    if (!parent) {
      return res.status(404).send('Parent employee not found');
    }
    parent.addEmployee(employee);
    employee.parent = parent;
  }

  employees[id] = employee;
  res.status(201).json(employee);
};
