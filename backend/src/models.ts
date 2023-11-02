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

export { Employee, Developer, Manager, EmployeeType, ProgrammingLanguage, Departments };
