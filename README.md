# WorkFlow

## Description:
A command-line application built with Node.js, Inquirer, and MySQL to manage a company's employee database.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Demonstration](#demonstration)
- [Contributions](#contributions)
- [Links](#links)
- [License](#license)

## Installation:
1. Clone this repository to your local machine.

2. Install the required dependencies using the following command:

    npm install inquirer@8.2.4 mysql2 

3. Set up your MySQL database by executing the schema.sql file to create the necessary tables.

4. (Optional) Run the seeds.sql file to pre-populate your database with sample data.

5. Update the database credentials in the const db connection with your own MySQL credentials.

6. Start the application by running the following command:

    node index.js

7. Follow the prompts in the command-line interface to view and manage your employee database.

## Usage:
After you have followed the steps in [Installation](#installation):

**Interface**: WorkFlow runs in the command-line. All data will be acessed and displayed in your terminal. 

**Options**: Through WorkFlow, you can:
- View all departments
- View all roles
- View all employees
- Add a department
- Add a role
- Add an employee
- Update an employee role

**Errors**: If errors occur, please refer to the error message in your colsole. The log will tell you where the error occoured which will assis in debugging. 

## Demonstration:

1. **View** departments, roles and employees
![WorkFlow1](/assets/WorkFlow1.png)

2. **Added** Managment department, which was updated in the view departments options as well
![WorkFlow2](/assets/WorkFlow2.png)

3. **Added and Updated** an employee, which was updated in the view employees option as well
![WorkFlow3](/assets/WorkFlow3.png)



https://github.com/kemcclen/WorkFlow/assets/123762040/494651d7-8148-40be-a2fb-1ac82c475ffd


## Contributions: 

Contributions to the WorkFlow are welcome! If you have any improvements, bug fixes, or new features to add, feel free to submit a pull request.

To contribute to WorkFlow, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes in the new branch.
4. Commit your changes, providing a descriptive commit message.
5. Push your branch to your forked repository.
6. Open a pull request against the main repository.
7. Provide a clear and concise description of your changes in the pull request.
8. Submit the pull request and wait for feedback or further instructions.

Please note that by submitting a pull request, you agree to allow the project maintainers to license your work under the project's existing license.

Thank you for considering contributing to WorkFlow. Your contributions are highly appreciated!

## Links: 
- Repository: https://github.com/kemcclen/WorkFlow

## License:
WorkFlow is licensed under the [MIT License](https://opensource.org/license/mit/).

_The MIT License is a permissive open-source license that allows you to use, modify, and distribute the project for both commercial and non-commercial purposes. It provides you with the freedom to customize the application to suit your needs._

_By contributing to WorkFlow, you agree that your contributions will be licensed under the same MIT License. This ensures that the project remains open-source and accessible to the community._

