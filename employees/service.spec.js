import { removeEmployee, addEmployee } from './service.pure';
import { DATA } from './employees-json';

const employeesRemoved3 = DATA.employees.filter((item) => item.id !== 3);
test('removeEmployee', () => expect(removeEmployee(DATA.employees, 3)).toEqual(employeesRemoved3));

describe('addEmployee', () => {
    const newEmployee = {
        id: 1,
        name: 'Пафнутий2',
        surname: 'Пафнутьев3',
        department: 'IT4',
        managerRef: 2,
        dateOfBirth: '2000-01-01',
        salary: 1000
    };
    it('increases length of list', () => {
        expect(addEmployee(DATA.employees, newEmployee).length).toBe(DATA.employees.length + 1);
    });

    it('adds a new employee to the end of the list', () => {
        const newEmployees = addEmployee(DATA.employees, newEmployee);
        expect(newEmployees[DATA.employees.length].name).toEqual(newEmployee.name);
    });

    it('throws if new employee has no name', () => {
        expect(() => addEmployee(DATA.employees, { ...newEmployee, name: '' })).toThrow();
    });

    it('throws if new employee has no surname', () => {
        expect(() => addEmployee(DATA.employees, { ...newEmployee, surname: '' })).toThrow();
    });
});
