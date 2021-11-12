import {
    runUI,
    addEmployeeUI,
    openTab,
    searchEmployeeUI,
    removeEmployeeUI
} from './employees/ui-all';
import './style.css';
import { Employee, jsonToEmployees } from './employees/model/Employee';
import * as server from './employees/server';

window.addEmployeeUI = addEmployeeUI;
window.openTab = openTab;
window.searchEmployeeUI = searchEmployeeUI;
window.removeEmployeeUI = removeEmployeeUI;
window.Employee = Employee;
window.allEmployees = async function () {
    return jsonToEmployees(await server.getEmployees());
};

runUI();

if (module.hot) {
    module.hot.accept();
}

function render() {
    document.getElementById('employees').innerHTML = html;
}

let html = '';

async function printBonus() {
    let employees = jsonToEmployees(await server.getEmployees());
    html += '<br>Async/await version:<br>';
    for (let e of employees) {
        let bonus = '';
        try {
            bonus = await e.bonus();
            const total = e.salary ? e.salary + bonus : `ABSENT SALARY + ${bonus}`;
            html += `${e.name} bonus: ${bonus} total: ${total}<br>`;
        } catch (bonus) {
            html += `${e.name} bonus is too big (${bonus}!) <br>`;
        }

        render();
    }
}

printBonus();
render();
