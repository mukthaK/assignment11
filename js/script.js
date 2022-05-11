// IMPORT MODULE
import * as Employees from './modules/init.js';
// GET EMPLOYEES FROM JSON FILE
let employees = Employees.fetchEmployees();

// GET DOM ELEMENTS
let empTable    = document.querySelector('#employees');
let empCount    = document.querySelector('#empCount');

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
buildGrid(employees);

// DELETE EMPLOYEE
empTable.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        // CONFIRM THE DELETE
        if (confirm('Are you sure you want to delete this employee?')) {
            // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
            let rowIndex = e.target.parentNode.parentNode.rowIndex;
            // REMOVE EMPLOYEE FROM ARRAY
            empTable.deleteRow(rowIndex);
        }
    }
});

// BUILD THE EMPLOYEES GRID
function buildGrid(employees) {
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    empTable.lastElementChild.remove();
    // REBUILD THE TBODY FROM SCRATCH
    let tbody = document.createElement('tbody');
    // LOOP THROUGH THE PROMISE
    // REBUILDING THE ROW STRUCTURE
    employees
        .then((emp) => {
            for (let e of emp) {
                tbody.innerHTML += 
                `
                <tr>
                    <td>${e.id}</td>
                    <td>${e.name}</td>
                    <td>${e.ext}</td>
                    <td><a href="mailto:${e.mail}">${e.email}</a></td>
                    <td>${e.department}</td>
                    <td><button class="btn btn-sm btn-danger delete">X</button></td>
                </tr>
                `
            }
            // BIND THE TBODY TO THE EMPLOYEE TABLE
            empTable.appendChild(tbody);
            // UPDATE EMPLOYEE COUNT
            empCount.value = `(${emp.length})`;
        })
        .catch((err) => console.log(err));    
};