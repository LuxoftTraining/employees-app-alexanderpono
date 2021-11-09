import { DATA } from './employees/employees-json';
import { runUI, addEmployeeUI, openTab, searchEmployeeUI } from './employees/ui';

console.log('main.js!! DATA=', JSON.stringify(DATA));
window.addEmployeeUI = addEmployeeUI;
window.openTab = openTab;
window.searchEmployeeUI = searchEmployeeUI;

runUI();
