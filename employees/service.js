import { DATA } from './employees-json';

function findByName(name, surname) {
    let res = [];
    for (var e of DATA.employees) {
        if ((!name || e.name === name) && (!surname || e.surname === surname)) {
            res.push(e);
        }
    }
    return res;
}

export function addEmployee(name, surname) {
    if (!name || name.length == 0 || !surname || surname.length == 0) {
        throw new Error('name and surname should be not empty');
    }
    let max = 0;
    for (let e of DATA.employees) {
        if (e.id > max) max = e.id;
    }
    let id = max + 1;
    DATA.employees.push({ id, name, surname });
    return id;
}

export function removeEmployee(id) {
    let index = 0;
    for (let e of DATA.employees) {
        if (e.id === id) break;
        index++;
    }
    DATA.employees.splice(index, 1);
}

function showEmployee(employee) {
    const keys = Object.keys(employee);
    console.log('Информация о сотруднике ' + employee['name'] + ':');
    for (let key of keys) {
        console.log(key + ' = ' + employee[key]);
    }
}

const employeeMap = {};

function findById(id) {
    if (employeeMap[id]) {
        return employeeMap[id];
    }
    for (var e of DATA.employees) {
        if (id == e.id) {
            employeeMap[id] = e;
            return e;
        }
    }
}

function setDateOfBirth(id, date) {
    const employee = findById(id);
    employee.dateOfBirth = date;
}

function testEmployee() {
    addPhone(133, '555-55-55');
    addPhone(133, '666-66-66');
    setDateOfBirth(133, new Date(2000, 1, 1));
    const info = getEmployeeInfo(133);
    console.log(info);
}

function getEmployeeJSON(id) {
    const e = findById(id);
    return JSON.stringify(e);
}

export function setEmployeeManager(id, managerId) {
    const employee = findById(id);
    employee.managerRef = managerId;
}

export function searchEmployees(name, surname, managerRef) {
    let results = [];
    for (let e of DATA.employees) {
        if (
            (!name || e.name == name) &&
            (!surname || e.surname == surname) &&
            (!managerRef || e.managerRef == managerRef)
        ) {
            results.push(e);
        }
    }
    return results;
}

export function getEmployees() {
    return DATA.employees;
}
