# Library Management System

## Description

The Library Management System is a comprehensive application designed to manage book inventories, track borrower
details, and handle transactions efficiently. It includes user management, book inventory management, borrowing system,
search and recommendations, notifications and alerts, and reporting features.

## Features

### User Management

-   Login/Logout functionality for Admin, Librarians, and Users.
-   Role-based access control: Admin, Librarian, and User roles.

### Book Inventory Management

-   Book details: ISBN, title, author, publisher, year, genre, quantity.
-   Integration with Google Books API to fetch book data using ISBN.

### Borrowing System

-   Checkout process for borrowing books.
-   Return process including due dates and late fees calculation.
-   History tracking for each user's borrowed and returned books.

### Search

-   Advanced search options (by title, author, genre, etc.).

### Reporting

-   Generate reports on book usage, overdue items, user activity, etc.
-   Dashboard for admins and librarians to see real-time statistics.

## Technologies Used

-   **Frontend:** React, PrimeReact, Tailwind CSS
-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB
-   **Authentication:** JSON Web Token with JWT

## Setup Instructions

### Prerequisites

-   Node.js (v14 or later)
-   MongoDB

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/AyushVChauhan/library-management
    cd library-management

    ```

2.  **Install dependencies for both client and server:**

    ```bash
    # For client
    cd client-web
    npm install

    # For server
    cd server
    npm install

    ```

3.  **Create a .env file in the server directory and add the following environment variables:**

    `PORT`, `MONGODB_URI_DEVELOPMENT`, `MONGODB_URI`, `ENVIRONMENT`, `JWT_SECRET`, `STRIPE_API_SRECRET_KEY`,
    `EMAIL_USER`, `EMAIL_PASSWORD`

4.  **add google.json in server/configs**

    ```
    {
        "type": "service_account",
        "project_id": "",
        "private_key_id": "",
        "private_key": "",
        "client_email": "",
        "client_id": "",
        "auth_uri": "",
        "token_uri": "",
        "auth_provider_x509_cert_url": "",
        "client_x509_cert_url": "",
        "universe_domain": ""
    }
    ```

5.  **Run the application:**

    ```bash
    # For client
    cd client-web
    npm run dev

    # For server
    cd server
    npm start

    ```

6.  **Access the application:**

    ```bash
    Open your browser and go to http://localhost:5173
    ```

# Usage

## Admin

-   Manage user roles and permissions.
-   View real-time statistics and generate reports.

## Librarian

-   Manage book inventory.
-   Track borrowing and returning of books.

## User

-   Search for books.
-   Overdue payments.
