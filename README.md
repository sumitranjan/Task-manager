# Task Management API

This API provides endpoints to manage tasks including creation, retrieval, update, deletion, filtering, and sorting.

## Getting Started

To get started with this API, follow these steps:

1. Clone the repository:

    ```console
    git clone https://github.com/sumitranjan/task-manager
    cd task-manager
    ```


2. Install dependencies:
    ```console
    $ npm install
    ```


3. Start the server:
    ```console
    $ npm start
    ```


The server will start running on `http://localhost:3000`.

## API Endpoints

### Get All Tasks

- **GET /tasks**
- Query Parameters:
 - `completed`: Filter tasks by completion status (`true` or `false`)
 - `sortBy`: Sort tasks by creation date (`createdAt`)
 - `order`: Sorting order (`asc` for ascending, `desc` for descending)

### Get Task by ID

- **GET /tasks/:id**

### Create a New Task

- **POST /tasks**
- Request Body:
 ```json
 {
   "title": "Task Title",
   "description": "Task Description",
   "completed": false,
   "priority": "high"
 }
 ```

### Update Task by ID

- **PUT /tasks/:id**
- Request Body: Same as create endpoint

### Delete Task by ID

- **DELETE /tasks/:id**

### Get Tasks by Priority

- **GET /tasks/priority/:level**
- `:level` can be `low`, `medium`, `high`

## Error Handling

- The API handles common errors such as invalid requests or not found responses with appropriate status codes and error messages.

## Dependencies

- Express.js: Web framework for Node.js that includes middleware for parsing JSON and URL-encoded request bodies.
