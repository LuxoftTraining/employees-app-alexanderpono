import { employeeManagerView } from './ui';
import { DATA } from './employees-json';

String.prototype.trimAll = function () {
    return this.replace(/>\s+</g, '><').replace(/\s\s+/g, ' ').trim();
};

String.prototype.removeTags = function () {
    return this.replace(/<[^>]+>/g, '').trimAll();
};

test('employeeManagerView', () => {
    const result = employeeManagerView(DATA.employees, 3).trimAll();
    expect(result).toEqual(
        `
        <span>
        <select>
        <option value="1" >Пафнутий Пафнутьев</option><option value="2" >Вася Васильев</option>
        <option value="4" >Маша Морева</option><option value="3" selected>Коля Николаев</option>
        </select>
        </span>
    `.trimAll()
    );
});

test('employeeManagerViewText', () => {
    expect(employeeManagerView(DATA.employees, 3).removeTags()).toEqual(
        'Пафнутий ПафнутьевВася ВасильевМаша МореваКоля Николаев'
    );
});
