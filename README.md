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
### Dashboard
![admin-dash](https://github.com/user-attachments/assets/6a27fcf8-fef0-498f-8689-405a9d1cc44d)
### Manage Librarians
![manage-librarians](https://github.com/user-attachments/assets/c69a49a5-e80c-4076-a941-dadd1d4a16fe)
### Insights
![insights](https://github.com/user-attachments/assets/b58ae4c1-cbdd-404b-90fa-f6e34a875a37)
![admininsights](https://github.com/user-attachments/assets/5c345adc-659a-4339-924c-a5b13c9b0641)
![admininsights2](https://github.com/user-attachments/assets/cf31b444-9594-4c06-a541-d0b594377035)
### User Activity
![activity-1](https://github.com/user-attachments/assets/27ede9b2-68e1-4c56-bf3a-1e78871a37ed)
![activity-2](https://github.com/user-attachments/assets/b258e2b7-b0a6-4a85-bcc9-08229f8d82bc)

## Librarian
### Dashboard
![lib-dash](https://github.com/user-attachments/assets/9d0c1882-9117-45c0-a040-3c4af058d951)
### Add Book
![add-book](https://github.com/user-attachments/assets/4d8816f5-98ea-467b-9a76-0166dc6008e4)
### History
![history](https://github.com/user-attachments/assets/5b9b510a-73b9-4a6d-b2a0-cbc1efa13c03)
### Return Book
![return-book](https://github.com/user-attachments/assets/5044af11-782a-4831-a0c7-fa40e422a29d)

## User
### Login
![login](https://github.com/user-attachments/assets/d28d559a-d0db-4d43-86ca-51038e6b5d63)
### Register
![register](https://github.com/user-attachments/assets/13820cf1-eb9e-4045-a2b6-c70ba4c31a5d)
### Landing
![landing](https://github.com/user-attachments/assets/ac658e2d-b7b9-4930-8719-9cdf1673befe)
### Payments
![user-payments](https://github.com/user-attachments/assets/b780cb8d-7321-48be-81b1-9c7bfa898504)
![user-payments-2](https://github.com/user-attachments/assets/593b8d25-d5cc-4923-9066-40e27958d62c)


