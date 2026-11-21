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

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express 5 | HTTP server, routing, and middleware |
| EJS | Server-rendered views |
| Prisma ORM | Database access and migrations |
| MySQL / TiDB | Relational data storage |
| `@prisma/adapter-mariadb` | Prisma connection to the MySQL-compatible database |
| `express-session` | User session management |
| Prisma Session Store | Database-backed session storage |
| bcrypt | Password hashing |
| Helmet | HTTP security headers |
| dotenv | Environment variable loading |
| Nodemon | Development server auto-reload |
| JavaScript Fetch API | Sending concurrent race-test requests |

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

## Capacity and Race Protection

Registration uses a Prisma transaction and locks the event row before counting registrations:
