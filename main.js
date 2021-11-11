import {
    runUI,
    addEmployeeUI,
    openTab,
    searchEmployeeUI,
    removeEmployeeUI
} from './employees/ui-all';
import './style.css';
import { Employee, jsonToEmployees } from './employees/model/Employee';
import { DATA } from './employees/employees-json';

window.addEmployeeUI = addEmployeeUI;
window.openTab = openTab;
window.searchEmployeeUI = searchEmployeeUI;
window.removeEmployeeUI = removeEmployeeUI;
window.Employee = Employee;
window.allEmployees = function () {
    return jsonToEmployees(DATA.employees);
};

runUI();

if (module.hot) {
    module.hot.accept();
}

function render() {
    document.getElementById('employees').innerHTML = html;
}

let employees = jsonToEmployees(DATA.employees);
let html = '';

async function printBonus() {
    html += '<br>Async/await version:<br>';
    for (let e of employees) {
        let bonus = '';
        try {
            bonus = await e.bonus();
            html += `${e.name} bonus: ${bonus} total: ${e.salary + bonus}<br>`;
        } catch (bonus) {
            html += `${e.name} bonus is too big (${bonus}!) <br>`;
        }

        render();
    }
}

printBonus();
render();
