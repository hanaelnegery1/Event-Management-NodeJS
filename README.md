# Event Management System

A Node.js event management application that allows organizers to create capacity-limited events, share public registration links, and view their attendee lists.

## Features

- Organizer account creation, login, and logout
- Event creation with title, location, start date, and capacity
- Unique public registration link for every event
- Public registration using name and email
- Duplicate email prevention per event
- Capacity enforcement
- Organizer dashboard with registration counts
- Private attendee list for each organizer
- Concurrent registration race test script

## Technologies Used

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=8D1F2D" alt="EJS">
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL">
  <img src="https://img.shields.io/badge/TiDB-FF6B6B?style=for-the-badge&logo=pingcap&logoColor=white" alt="TiDB">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Helmet-4A90E2?style=for-the-badge&logo=security&logoColor=white" alt="Helmet">
  <img src="https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white" alt="Nodemon">
  <img src="https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black" alt="dotenv">
</p>

- **Express 5** - HTTP server, routing, and middleware
- **EJS** - Server-rendered interface
- **Prisma ORM** - Database access and migrations
- **MySQL / TiDB** - Relational database storage
- **Prisma MariaDB Adapter** - MySQL-compatible Prisma connection
- **Express Session + Prisma Store** - Database-backed user sessions
- **bcrypt** - Password hashing
- **Helmet** - HTTP security headers
- **dotenv** - Environment variable loading
- **Nodemon** - Development server reload
- **Fetch API** - Concurrent registration testing

## Project Structure

```text
src/
├── app.js                 # Express configuration and middleware
├── index.js               # Database check and server startup
├── session.js             # Session configuration
├── prisma.js              # Prisma and MariaDB adapter configuration
├── routes/                # Authentication and event routes
├── controllers/           # Request and response handling
├── models/                # Database access functions
├── middleware/            # Organizer authentication
└── views/                 # EJS pages and partials

prisma/
├── schema.prisma          # Database models
└── migrations/            # Database migrations

scripts/
└── race.js                # Sends 20 simultaneous registrations

public/
└── css/style.css          # Application styling
```

## Database Models

### User

Stores organizer names, email addresses, and bcrypt password hashes. A user can organize multiple events.

### Event

Stores the event title, location, start date, capacity, unique public slug, and organizer relationship.

### Registration

Stores an attendee's name and email. A compound unique constraint on `eventId` and `email` prevents the same email from registering twice for an event.

## Usage

1. Create an organizer account at `/signup`.
2. Log in and open `/dashboard`.
3. Select **Create event**.
4. Enter the title, location, start date, and capacity.
5. Copy the public event link displayed on the dashboard.
6. Anyone with the link can register using a name and email.
7. Select **View attendees** to see registrations for an event.

## Event Management System

Built with Node.js, Express, Prisma, and MySQL / TiDB

<sub>Reliable event capacity • Secure registration • Concurrent-safe processing</sub>

</div>
