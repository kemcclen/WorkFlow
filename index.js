//Packages 
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

//Port for connection via "http://localhost:3001/" in browser 
const PORT = 3001;

const app = express();

//Middleware 
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the local database
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'rodrigues',
  database: 'workflow_db',
});


// Prompt user to choose an option
function init() {
  inquirer
    .prompt({
      type: 'list',
      name: 'option',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    })
    //function swictch case for every option 
    .then((answer) => {
      switch (answer.option) {
        case 'View all departments':
          viewAllDepartments();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Exit':
          console.log('Goodbye!');
          db.end();
          break;
      }
    });
 }
 
