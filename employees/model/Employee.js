import { Person } from './Person';

export class Employee extends Person {
    constructor(name, surname, department) {
        super(name, surname);
        this.department = department;
    }

    static fromJSON(obj) {
        return Object.assign(new Employee(), obj);
    }

    bonus() {
        var bonus = Math.round(Math.random() * 1000);
        return new Promise((resolve, reject) =>
            setTimeout(() => (bonus < 700 ? resolve(bonus) : reject(bonus)), 1000)
        );
    }

    total() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.bonus());
            } catch (bonus) {
                console.error('total(): bonus exception detected', bonus);
                reject(bonus);
            }
        });
    }
}

export function jsonToEmployees(employeesJSON) {
    let employees = [];
    for (let e of employeesJSON) {
        employees.push(Employee.fromJSON(e));
    }
    return employees;
}
