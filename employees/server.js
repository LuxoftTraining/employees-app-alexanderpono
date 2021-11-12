import axios from 'axios';
const employees = axios.create({ baseURL: 'http://localhost:3333/employees' });

function errorResponseHandler(error) {
    // if has response show the error
    if (error.response.data.message) {
        console.log('SERVER ERROR: ' + error.response.data.message);
    }
    if (error.message) {
        console.log('SERVER ERROR: ' + error.message);
    } else {
        console.log('ERROR: ' + error);
    }
}

// apply interceptor on response
employees.interceptors.response.use((response) => response, errorResponseHandler);

export async function getEmployees() {
    let res = await employees.get('');
    return res.data._embedded.employees;
}

export async function findByExample(employee) {
    let res = await employees.post('findByExample', employee);
    return res.data;
}

export async function addEmployee(name, surname, managerId = null) {
    let e = await employees.post('', { name, surname, managerId });
    return e.data;
}

export async function setEmployeeManager(id, managerId) {
    await employees.post(id + '/managerId?id=' + managerId);
}
