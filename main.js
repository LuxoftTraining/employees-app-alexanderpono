import {
    runUI,
    addEmployeeUI,
    openTab,
    searchEmployeeUI,
    removeEmployeeUI
} from './employees/ui-all';
import './style.css';
import { Employee, jsonToEmployees } from './employees/model/Employee';

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
