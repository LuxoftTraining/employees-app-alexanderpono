export function removeEmployee(employees, id) {
    return employees.filter((e) => e.id !== id);
}

export function addEmployee(employees, newEmployee) {
    if (
        !newEmployee.name ||
        newEmployee.name.length == 0 ||
        !newEmployee.surname ||
        newEmployee.surname.length == 0
    ) {
        throw new Error('name and surname should be not empty');
    }
    let max = 0;
    for (let e of employees) {
        if (e.id > max) max = e.id;
    }
    let id = max + 1;
    return [...employees, { ...newEmployee, id }];
}
