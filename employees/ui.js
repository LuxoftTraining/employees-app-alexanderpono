import { removeEmployee } from './service';
import { DATA } from './employees-json';
import { jsonToEmployees } from './model/Employee';
import * as server from './server';

const PLACEHOLDER = 'employeesPlaceholder';

function clearEmployeesPlaceholder() {
    document.getElementById(PLACEHOLDER).innerHTML = '';
}

export async function runUI() {
    const employees = await server.getEmployees();
    const employeesOptions = await getEmployeesOptions();
    showEmployees(employees);
    fillSelect(document.getElementById('managerSelect'), employeesOptions);
    fillSelect(document.getElementById('managerSearch'), employeesOptions);
    document.getElementById('searchButton').click();
    assignSendOnEnter('searchPane', 'searchEmployeesButton');
    assignSendOnEnter('addPane', 'addEmployeeButton');
}

async function showEmployees(employeesJSON) {
    let employees = jsonToEmployees(employeesJSON);
    let allEmployees = await server.getEmployees();
    const html = showEmployeesView(allEmployees, employees);
    document.getElementById(PLACEHOLDER).innerHTML = html;
}

export async function addEmployeeUI() {
    let errorHTML = '';
    const name = document.getElementById('name').value;
    if (name == '') {
        errorHTML += '- Имя сотрудника должно быть задано<br>';
        document.getElementById('name').style.backgroundColor = '#FFEEEE';
    }
    const surname = document.getElementById('surname').value;
    if (surname == '') {
        errorHTML += '- Фамилия сотрудника должна быть задана<br>';
        document.getElementById('surname').style.backgroundColor = '#FFEEEE';
    }
    document.getElementById('addEmployeeFormErrorMessage').innerHTML = errorHTML;
    if (errorHTML.length != 0) return;

    let employee = await server.addEmployee(name, surname);
    const managerId = document.getElementById('managerSelect').value;
    await server.setEmployeeManager(employee.id, managerId);

    showEmployees(await server.getEmployees());
    document.getElementById('name').value = '';
    document.getElementById('surname').value = '';
}

export function removeEmployeeUI(id) {
    removeEmployee(id);
    showEmployees(DATA.employees);
}

function fillSelect(select, values, selectedValue) {
    select.innerHTML = '';
    for (let val of values) {
        const option = document.createElement('option');
        option.text = val.text;
        option.value = val.value;
        if (selectedValue == option.value) option.selected = true;
        select.appendChild(option);
    }
}

export function selectView(values) {
    const values_html = values
        .map(
            (v) =>
                `<option value="${v.value}" 
    ${v.selected ? 'selected' : ''}>${v.text}</option>`
        )
        .join('');
    return `<select>${values_html}</select>`;
}

export function employeeManagerView(employees, selectedId) {
    if (!selectedId) return '';
    let values = employees.map((e) => {
        return { text: e.name + ' ' + e.surname, value: e.id, selected: e.id === selectedId };
    });
    return `<span>${selectView(values)}</span>`;
}

function showEmployeesView(allEmployees, employees) {
    let li_items = employees
        .map(
            (e) =>
                `<li>${e}<button 
            onclick="removeEmployeeUI(${e.id})">X</button>
    ${employeeManagerView(allEmployees, e.managerId)}
    </li>`
        )
        .join('');

    return `<ul>${li_items}</ul>`;
}

async function getEmployeesOptions() {
    let employees = await server.getEmployees();
    return employees.map((e) => {
        return { text: e.name + ' ' + e.surname, value: e.id };
    });
}

export async function searchEmployeeUI() {
    const name = document.getElementById('nameSearch').value || null;
    const surname = document.getElementById('surnameSearch').value || null;
    const managerId = document.getElementById('managerSearch').value || null;
    const example = { name, surname, managerId };

    showEmployees(await server.findByExample(example));
}

/**
 * Активирует выбранный таб
 * @param evt событие, вызывающее активацию
 * @param id идентификатор таба
 */
export function openTab(evt, id) {
    // Определяем переменные
    var i, tabcontent, tablinks;

    // Получаем все элементы с class="tabcontent" и прячем их
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }

    // Получаем все элементы с class="tablinks" и удаляем класс "active"
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }

    // Показываем текущий таб и добавляем класс "active"
    // на кнопку, которая открывает этот таб
    document.getElementById(id).style.display = 'block';
    evt.currentTarget.className += ' active';
}

function assignSendOnEnter(paneId, buttonId) {
    let allInput = document.querySelectorAll('#' + paneId + ' input');
    for (let input of allInput) {
        input.addEventListener('keyup', function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                document.querySelector('#' + paneId + ' button').click();
            }
        });
    }
}
