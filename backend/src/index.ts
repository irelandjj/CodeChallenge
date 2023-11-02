import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createEmployee, getEmployeeChildren, updateEmployeeParent } from './api';
import { Manager, Departments, Employee } from './models';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const employees: { [key: number]: Employee } = {};
let employeeCounter = { count: 0 };

app.post('/api/employees', (req, res) => createEmployee(req, res, employees, employeeCounter));
app.get('/api/employees/:id/children', (req, res) => getEmployeeChildren(req, res, employees));
app.patch('/api/employees/:id/parent', (req, res) => updateEmployeeParent(req, res, employees));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Initialize a default manager
const defaultManager = new Manager(++employeeCounter.count, 'Lars Ulrich', 1, Departments.IT);
employees[defaultManager.id] = defaultManager;