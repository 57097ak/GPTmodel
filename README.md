# GPTmodel
# GPT Model API with MERN Stack

This project is a MERN stack application that integrates with the OpenAI API to provide text summarization functionality. The backend is built with Node.js, Express, and MongoDB, while the frontend is built with React. Swagger is used to generate API documentation.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration, login, and logout
- Text summarization using OpenAI's GPT-3.5-turbo model
- Swagger documentation for the API

## Requirements

- Node.js
- MongoDB
- OpenAI API key

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/gpt-model-api.git
    cd gpt-model-api
    ```

2. **Install server dependencies:**

    ```bash
    cd server
    npm install
    ```

3. **Install client dependencies:**

    ```bash
    cd client
    npm install
    ```

4. **Set up environment variables:**

    Create a `.env` file in the `server` directory with the following content:

    ```plaintext
    NODE_ENV=development
    PORT=4242
    MONGO_URI=your_mongodb_connection_string
    JWT_ACCESS_SECRET=your_jwt_access_secret
    JWT_ACCESS_EXPIRE=15m
    JWT_REFRESH_SECRET=your_jwt_refresh_secret
    JWT_REFRESH_EXPIRE=7d
    OPENAI_API_SECRET=your_openai_api_key
    ```

5. **Run the application:**

    Open two terminal windows or tabs. In the first one, start the backend server:

    ```bash
    cd server
    npm start
    ```

    In the second one, start the frontend development server:

    ```bash
    cd client
    npm start
    ```

    The backend server will run on `http://localhost:4242` and the frontend will be available on `http://localhost:3000`.

## Usage

### Backend

The backend provides RESTful API endpoints for user authentication and text summarization.

### Frontend

The frontend is a React application that allows users to register, login, and use the text summarization functionality.

## API Documentation

Swagger is used for API documentation. After starting the server, navigate to `http://localhost:4242/api-docs` to view the API documentation.

### Example Swagger Configuration

```javascript
// swagger.js

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'GPT Model API',
            version: '1.0.0',
            description: 'API documentation for the GPT Model API',
            contact: {
                name: 'Your Name',
                email: 'your.email@example.com'
            },
            servers: [
                {
                    url: 'http://localhost:4242',
                    description: 'Development server'
                }
            ]
        },
    },
    apis: ['./routes/*.js', './models/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = {
    swaggerUi,
    swaggerDocs,
};
