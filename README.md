# Admin Employee Management React App

This React application is built using Typescript and Redux for state management. It includes unit and integration tests for the Admin user login form, ensuring good coding practices and design patterns.

## Overview
This React application, built with Typescript and Redux, manages employee data efficiently. The project focuses on implementing good coding practices and design patterns while incorporating unit and integration tests for the Admin user login form.

## Features Implemented
- `Admin User Login Form`: A secure login form accessible at /login handles authentication and initializes admin users if necessary.
- `Home Page`: Displays a list of employees fetched from the Redux store at /. It includes options to add new employees and view employee details.
- `Employee Details Screen`: Provides a detailed view of individual employees at /employees/{id} with options to edit employee information.
- `Logout Functionality`: Allows users to securely logout, clearing authentication and redirecting them as needed.

## Technologies Used
- React
- Typescript
- Redux
- Jest
- ESLint & Prettier
- Material UI
- Formik

## Installation and Usage
1. Clone the repository.
2. Install dependencies with `npm install`.
3. Start the development server with `npm run dev`.
4. Access the application at `http://localhost:5174/`.

For detailed scripts and commands, refer to the package.json file.

## Testing
- Ensure thorough testing coverage by running `npm run test`. This command executes unit and integration tests using Jest, validating the functionality of various components and modules.

## Commit Convention
- To ensure readability and consistency in `commit messages`, the conventional commit format is used for writing commit messages that are `clear, concise, and informative`.
- Each commit message should adhere to the following pattern:

```
<type>(<scope>): <description>

[optional body]

[optional footer]

```

Where:

- `<type>` specifies the type of the commit (e.g., feat, fix, chore, docs, style).
- `<scope>` is optional and indicates the scope of the commit (e.g., component name, module).
- `<description>` is a short, concise description of the change.
- `[optional body]` provides additional context or details about the change.
- `[optional footer]` includes any relevant issue or breaking change references.

This convention helps in tracking and understanding the `purpose` of each commit.
See the section about [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#specification) for more information.