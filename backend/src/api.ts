import { Request, Response } from 'express';
import { Employee, Developer, Manager, EmployeeType, ProgrammingLanguage, Departments } from './models';

export const createEmployee = (req: Request, res: Response, employees: { [key: number]: Employee }, employeeCounter: { count: number }) => {
    const { name, layer, type, department, programmingLanguage, parentId } = req.body;
    const id = ++employeeCounter.count;
    let employee: Employee;
    const employeeType = parseInt(type);

    if (employeeType === EmployeeType.Manager) {
        employee = new Manager(id, name, layer, department);
    } else if (employeeType === EmployeeType.Developer) {
        employee = new Developer(id, name, layer, programmingLanguage);
    } else {
        return res.status(400).send('Invalid employee type');
    }
    const parentIdInt = parseInt(parentId);
    if (parentIdInt) {
        const parent = employees[parentIdInt] as Manager;
        if (!parent) {
            return res.status(404).send('Parent employee not found');
        }
        parent.addEmployee(employee);
        employee.parent = parent;
    }

    employees[id] = employee;
    res.status(201).json({ id: employee.id, message: "Employee created successfully" });
};

export const getEmployeeChildren = (req: Request, res: Response, employees: { [key: number]: Employee }) => {
    const parent = employees[parseInt(req.params.id)] as Manager;
    if (!parent) {
        return res.status(404).send('Employee not found');
    }
    const employeeIds = parent.employees.map(emp => emp.id);
    res.json(employeeIds);
};

export const updateEmployeeParent = (req: Request, res: Response, employees: { [key: number]: Employee }) => {
    const { newParentId } = req.body;
    const employee = employees[parseInt(req.params.id)];
    const newParent = employees[newParentId] as Manager;

    if (!employee || !newParent) {
        return res.status(404).send('Employee or new parent not found');
    }

    if (employee.parent) {
        const oldParentIndex = employee.parent.employees.findIndex(e => e.id === employee.id);
        if (oldParentIndex > -1) {
          employee.parent.employees.splice(oldParentIndex, 1);
        }
      }      

    employee.parent = newParent;
    newParent.addEmployee(employee);

    res.json({ id: employee.id });
};