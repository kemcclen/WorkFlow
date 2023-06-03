//Packages
const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");

//Port for connection via "http://localhost:3001/" in browser
const PORT = 3001;

const app = express();

//Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the local database
const db = mysql.createConnection({
  //enter host details
  host: "",
  user: "root",
  //enter host password
  password: "",
  database: "workflow_db",
});

// Prompt user to choose an option
function init() {
  inquirer
    .prompt({
      type: "list",
      name: "option",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Exit",
      ],
    })
    //Function swictch case for every option
    .then((answer) => {
      switch (answer.option) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;
        case "Exit":
          console.log("Goodbye!");
          db.end();
          break;
      }
    });
};

// View all departments
function viewAllDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    init();
  });
};

// View all roles
function viewAllRoles() {
  db.query("SELECT * FROM role", function (err, results) {
    console.table(results);
    init();
  });
};

// View all employees
function viewAllEmployees() {
  //Joins that allow title name and managers full name to display instead of integer value
  const query = `
    SELECT 
      e.id, 
      e.first_name, 
      e.last_name, 
      r.title, 
      r.salary, 
      CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM 
      employee e
      LEFT JOIN role r ON e.role_id = r.id
      LEFT JOIN employee m ON e.manager_id = m.id
  `;

  db.query(query, function (err, results) {
    if (err) {
      console.error("Error retrieving employees:", err);
      return;
    }

    const parsedResults = JSON.parse(JSON.stringify(results));
    console.table(parsedResults);
    init();
  });
};

// Add a department
function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "departmentName",
      message: "Enter the name of the department:",
    })
    .then((answer) => {
      db.query(
        "INSERT INTO department SET ?",
        { department_name: answer.departmentName },
        function (err, results) {
          console.log("Department added!");
          init();
        }
      );
    });
};

// Add a role
function addRole() {
  // Fetch departments from the database
  db.query("SELECT * FROM department", function (err, results) {
    if (err) {
      console.error("Error retrieving departments:", err);
      return;
    }
    //Acessing options from SQL for roles
    const departments = results.map((department) => ({
      name: department.department_name,
      value: department.id,
    }));

    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "Enter the title of the role:",
        },
        {
          type: "input",
          name: "salary",
          message: "Enter the salary for the role:",
        },
        {
          type: "list",
          name: "departmentId",
          message: "Select the department for the role:",
          choices: departments,
        },
      ])
      .then((answer) => {
        db.query(
          "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
          [answer.title, answer.salary, answer.departmentId],
          function (err, results) {
            if (err) {
              console.error("Error adding role:", err);
              return;
            }
            console.log("Role added!");
            init();
          }
        );
      });
  });
};

// Add an employee
function addEmployee() {
  // Fetch roles from the database
  db.query("SELECT id, title FROM role", function (err, roleResults) {
    if (err) {
      console.error("Error retrieving roles:", err);
      return;
    }

    // Fetch employees from the database
    db.query(
      "SELECT id, first_name, last_name FROM employee",
      function (err, employeeResults) {
        if (err) {
          console.error("Error retrieving employees:", err);
          return;
        }

        //Acessing options from SQL for roles
        const roles = roleResults.map((role) => ({
          name: role.title,
          value: role.id,
        }));

        //Acessing options from SQL for employees
        const employees = employeeResults.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        }));

        inquirer
          .prompt([
            {
              type: "input",
              name: "firstName",
              message: "Enter the first name of the employee:",
            },
            {
              type: "input",
              name: "lastName",
              message: "Enter the last name of the employee:",
            },
            {
              type: "list",
              name: "roleId",
              message: "Select the role for the employee:",
              choices: roles,
            },
            {
              type: "list",
              name: "managerId",
              message: "Select the manager for the employee:",
              choices: [{ name: "None", value: null }].concat(employees),
            },
          ])
          .then((answer) => {
            db.query(
              "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
              [
                answer.firstName,
                answer.lastName,
                answer.roleId,
                answer.managerId,
              ],
              function (err, results) {
                if (err) {
                  console.error("Error adding employee:", err);
                  return;
                }
                console.log("Employee added!");
                init();
              }
            );
          });
      }
    );
  });
};

// Update an employee role
function updateEmployeeRole() {
  // Fetch employees from the database
  db.query(
    "SELECT id, first_name, last_name FROM employee",
    function (err, employeeResults) {
      if (err) {
        console.error("Error retrieving employees:", err);
        return;
      }

      // Get roles from the database
      db.query("SELECT id, title FROM role", function (err, roleResults) {
        if (err) {
          console.error("Error retrieving roles:", err);
          return;
        }

        // Accessing options from SQL for employees
        const employees = employeeResults.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        }));

        // Accessing options from SQL for roles
        const roles = roleResults.map((role) => ({
          name: role.title,
          value: role.id,
        }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "idChange",
              message:
                "Select the employee whose role you would like to change:",
              choices: employees,
            },
            {
              type: "list",
              name: "titleChange",
              message: "Select the new role for the selected employee:",
              choices: roles,
            },
          ])
          .then((answer) => {
            db.query(
              "UPDATE employee SET ? WHERE ?",
              [{ role_id: answer.titleChange }, { id: answer.idChange }],
              function (err, results) {
                if (err) {
                  console.error("Error updating role:", err);
                  return;
                }
                console.log("Role updated!");
                init();
              }
            );
          });
      });
    }
  );
};

// Set up server to listen on PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Run it!
init();
