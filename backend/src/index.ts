import express from 'express';

const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const enum ProgrammingLanguage {
    Javascript,
    Typescript,
    Python,
    Java,
    Cpp,
    CSharp,
}

const enum Departments {
    Marketing,
    Sales,
    HR,
    Finance,
    IT,
    RnD,
}

const enum EmployeeType {
    Manager,
    Developer,
}

class Employee {
    id: number;
    name: string;
    layer: number;
    parent: Manager | null;
    employeeType: EmployeeType;

    constructor(id: number, name: string, layer: number, parent: Manager | null, employeeType: EmployeeType) {
        this.id = id;
        this.name = name;
        this.layer = layer;
        this.parent = parent;
        this.employeeType = employeeType;
    }
}

class Manager extends Employee {
    department: Departments;
    employees: Array<Employee>;

    constructor(id: number, name: string, layer: number, department: Departments, parent: Manager | null = null) {
        super(id, name, layer, parent, EmployeeType.Manager);
        this.department = department;
        this.employees = [];
    }

    addEmployee(employee: Employee): void {
        this.employees.push(employee);
    }
}

class Developer extends Employee {
    programmingLanguage: ProgrammingLanguage;

    constructor(id: number, name: string, layer: number, programmingLanguage: ProgrammingLanguage, parent: Manager | null = null) {
        super(id, name, layer, parent, EmployeeType.Developer);
        this.programmingLanguage = programmingLanguage;
    }
}

const employees: { [key: number]: Employee } = {};
let employeeCounter = 0;

app.post('/api/employees', (req, res) => {
    const { name, layer, type, department, programmingLanguage, parentId } = req.body;

    const id = ++employeeCounter;
    let employee: Employee;

    if (type === EmployeeType.Manager) {
        employee = new Manager(id, name, layer, department);
    } else if (type === EmployeeType.Developer) {
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
});

