# Phonebook

A simple phonebook application that enables user to add, delete, update contact or sort contact by name.

## Demo Link

Access the deployed application at: https://solitary-hill-9246.fly.dev

## Table of Contents

- [Overview](#overview)
- [Technologies](#technologies)
- [Installation](#installation)
- [License](#license)

## Overview

In the application, the user can add a new contact, delete one or update phone number of an existing contact.
In addition, there is a filter bar to search for contacts by name.

There are two rules to follow when creating new contacts:
1. Name of the contact is required and its length is at least 3 characters.
2. A phone number is required, only contains numbers and must be formed of two parts separated by a dash.
The first part must only have two or three numbers while the second part must have length of six or more.

Frontend is built with ReactJS while for backend is NodeJS. Frontend is initialized by using the create-react-app tool.
In backend, the Express library is used to ease server-side development with NodeJS.

Styling is done with the help of the React Bootstrap framework.

MongoDB serves as database for the application. The project use the Mongoose library to make interacting with MongoDB much easier.

## Technologies

### Frontend

dependencies:
* axios: ^1.3.4

devDependencies:
* json-server: ^0.17.2

### Backend

dependencies:
* cors: 2.8.5
* dotenv: ^16.0.3
* express: ^4.18.2
* mongoose: ^6.10.0

devDependencies:
* nodemon: ^2.0.20

## Installation

Clone the project with the command:

```sh
git clone https://github.com/quangtricao/phonebook.git
```

In both client and server folders, install each folder's dependencies with the command:

```sh
npm install
```

Setting up a database is required before starting the application in development mode. Choose one of two following databases: JSON-server or MongoDB

**JSON server**

Change baseUrl in client/src/services to "http://localhost:3001/persons"

In frontend directory, start json-server with the command:

```sh
npm run server
```

With JSON-server, data is stored in the file "db.json" which can be found at the root of the client directory.

**MongoDB**

Change baseUrl in client/src/services to "api/persons".

Set environment variables by writing the below lines in a new file named ".env" in the root of the "server" directory:

```sh
MONGODB_URI = mongodb+srv://quangtricao:123@cluster0.kvzjilt.mongodb.net/phoneBook?retryWrites=true&w=majority
PORT = 3001
```

The MongoDB server is now ready to connect. In backend directory, run the command:

```sh
npm run dev
```

**Launch the application**

Now the frontend of the application is ready. In frontend directory, run the command:

```sh
npm start
```

The application should now be running on the address: http://localhost:3000/

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License.
