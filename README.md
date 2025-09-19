# EcoHubVerse

EcoHubVerse is a modern, full-stack web application designed to be a central hub for eco-conscious users. It provides a platform for sharing information, discussing topics, and accessing eco-friendly products and services. The project is built with a microservices-oriented architecture, with a separate frontend and backend.

## Features

The platform is envisioned to have the following features:

*   **Blog:** A content management system for articles and posts related to environmental topics.
*   **E-commerce:** A marketplace for sustainable and eco-friendly products.
*   **Chat:** A real-time chat feature for community discussions.
*   **Crypto:** A module for information and possibly transactions related to eco-friendly cryptocurrencies.
*   **E-learning:** A platform for online courses on sustainability and environmentalism.
*   **Dashboard:** A personalized dashboard for users to manage their activities and contributions.

## Technology Stack

*   **Frontend:** React (bootstrapped with `create-react-app`)
*   **Backend:** Node.js with Express
*   **Database:** Supabase (PostgreSQL)

## Project Structure

The repository is organized into the following main directories:

*   `frontend/`: Contains the React frontend application.
*   `backend/`: Contains the Node.js/Express backend application.
*   `docs/`: Contains project documentation, including the database schema.

## Setup and Installation

### Prerequisites

*   Node.js (v14.0.0 or later)
*   npm

### Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd EcoHubVerse_Complete/backend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```

### Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd EcoHubVerse_Complete/frontend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```

## Running the Application

### Backend

1.  Navigate to the backend directory:
    ```bash
    cd EcoHubVerse_Complete/backend
    ```
2.  Start the server:
    ```bash
    npm start
    ```
    The backend server will start on port 5000.

### Frontend

1.  Navigate to the frontend directory:
    ```bash
    cd EcoHubVerse_Complete/frontend
    ```
2.  Start the React development server:
    ```bash
    npm start
    ```
    The frontend application will be available at `http://localhost:3000`.

## API Documentation

The backend provides the following API endpoints for managing posts.

### Get all posts

*   **Endpoint:** `/api/posts`
*   **Method:** `GET`
*   **Description:** Retrieves a list of all posts.
*   **Response:**
    ```json
    [
      {
        "id": 1,
        "title": "Welcome to the Blog",
        "content": "This is the first post.",
        "author": "Admin",
        "created_at": "2025-09-15T13:51:53.000Z"
      },
      {
        "id": 2,
        "title": "Second Post",
        "content": "This is another post.",
        "author": "Admin",
        "created_at": "2025-09-15T13:51:53.000Z"
      }
    ]
    ```

### Get a single post

*   **Endpoint:** `/api/posts/:id`
*   **Method:** `GET`
*   **Description:** Retrieves a single post by its ID.
*   **Response:**
    ```json
    {
      "id": 1,
      "title": "Welcome to the Blog",
      "content": "This is the first post.",
      "author": "Admin",
      "created_at": "2025-09-15T13:51:53.000Z"
    }
    ```

### Create a new post

*   **Endpoint:** `/api/posts`
*   **Method:** `POST`
*   **Description:** Creates a new post.
*   **Request Body:**
    ```json
    {
      "title": "New Post Title",
      "content": "Content of the new post.",
      "author": "New Author"
    }
    ```
*   **Response:** The newly created post object.

### Update a post

*   **Endpoint:** `/api/posts/:id`
*   **Method:** `PUT`
*   **Description:** Updates an existing post.
*   **Request Body:**
    ```json
    {
      "title": "Updated Title",
      "content": "Updated content."
    }
    ```
*   **Response:** The updated post object.

### Delete a post

*   **Endpoint:** `/api/posts/:id`
*   **Method:** `DELETE`
*   **Description:** Deletes a post.
*   **Response:** `204 No Content`

## Database Schema

The database schema is defined in `docs/supabase_schema.sql`. It consists of the following tables:

### `users`

Stores user information.

| Column     | Type        | Description                  |
|------------|-------------|------------------------------|
| `id`       | `uuid`      | Primary key, unique user ID. |
| `email`    | `text`      | User's email address.        |
| `created_at`| `timestamp` | Timestamp of user creation.  |

### `posts`

Stores blog posts or articles.

| Column     | Type        | Description                   |
|------------|-------------|-------------------------------|
| `id`       | `serial`    | Primary key, auto-incrementing.|
| `title`    | `text`      | The title of the post.        |
| `content`  | `text`      | The content of the post.      |
| `author`   | `text`      | The author of the post.       |
| `created_at`| `timestamp` | Timestamp of post creation.   |

### `products`

Stores information about products in the e-commerce section.

| Column     | Type        | Description                   |
|------------|-------------|-------------------------------|
| `id`       | `serial`    | Primary key, auto-incrementing.|
| `name`     | `text`      | The name of the product.      |
| `price`    | `numeric`   | The price of the product.     |
| `created_at`| `timestamp` | Timestamp of product creation.|

## Deployment

This project is configured for easy deployment to [Vercel](https://vercel.com).

### Connecting to Vercel

1.  Create a new project on Vercel and connect it to your Git repository.
2.  Vercel will automatically detect the `vercel.json` file and configure the project accordingly.
3.  No special configuration is needed in the Vercel dashboard, as all settings are defined in `vercel.json`.

### Environment Variables

For the AI features to work, you must set the `OPENAI_API_KEY` environment variable in your Vercel project settings.

1.  In your Vercel project dashboard, go to the "Settings" tab.
2.  Click on "Environment Variables" in the left sidebar.
3.  Add a new variable with the name `OPENAI_API_KEY` and your OpenAI API key as the value.
