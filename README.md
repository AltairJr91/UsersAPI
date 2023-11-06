# Simple users API

This is a  API that manages users, allowing CRUD operations. Users can be created, read, updated, and deleted. The API is built using Node.js/TypeScript and Prisma for data modeling.

## Features

- **Create User:** Create a new user by providing the required user details.
- **Read User:** Fetch user details by their unique ID.
- **Update User:** Modify user details, such as email, name, or phone number.
- **DeleteUser:** Delete user from the database.
- **Delete with Patch:** Mark a user as deleted without removing them from the database.

## Prerequisites

To run this API, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)

## Getting Started

1. Clone this repository.

2. Install dependencies using npm:

    ```bash
    npm install
    ```

3. Run the server with nodemon:

    ```bash
    npx nodemon
    ```

## Endpoints

### Create a User

- **POST** `/users`

  Create a new user by sending a POST request to this endpoint with user details in the request body.

### Get User by ID

- **GET** `/users/:id`

  Fetch a user's details by providing the user's ID in the request URL.

### Update User

- **PUT** `/users/:id`

  Update a user's information by specifying the user's ID in the request URL and providing the updated user details in the request body.

### Delete User

- **DELETE** `/users/:id`

  Mark a user as deleted by providing the user's ID in the request URL. This operation remove the user from the database.

### Delete User

- **PATCH** `/users/:id`

  Mark a user as deleted by creating a Deleted_at dateTime in database. This operation does not remove the user from the database but marks them as deleted.

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to use.
