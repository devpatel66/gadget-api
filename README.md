# IMF Gadget API

## Overview
IMF Gadget API is a RESTful API that allows users to register, log in, and manage gadgets. The API is built using Node.js, Express, and TypeORM, and is deployed on Render.

## Features
- User authentication (Register & Login)
- CRUD operations on gadgets
- Secure password hashing
- API documentation via Postman

## Technologies Used
- Node.js
- Express.js
- TypeORM
- PostgreSQL
- Render (Deployment)
- Postman (API Documentation)

## Setup Instructions

### Prerequisites
- Node.js & npm installed
- PostgreSQL installed and running or you can use Neon Postgres (In project Neon Postgres is used)
- `.env` file with necessary configurations

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/devpatel66/gadget-api
   cd gadget-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up the `.env` file with the following values:
   ```env
   PGDATABASE=your_database_url
   PGHOST=hostname
   PGUSER=user
   PGPASSWORD=password
   JWT_SECRET_KEY=your_jwt_secret
   ```
4. Run migrations:
   ```sh
   npm run typeorm migration:run
   ```
5. Start the server:
   ```sh
   npm start
   ```

## API Endpoints
### Authentication
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/v1/api/auth/register` | Register a new user |
| POST | `/v1/api/auth/login` | Login user |

### Gadgets
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/v1/api/gadget` | Add a new gadget |
| GET | `/v1/api/gadget` | Get all gadgets |
| PATCH | `/v1/api/gadget` | Update a gadget |
| DELETE | `/v1/api/gadget/:id` | Delete a gadget |
| self-destruct | `/v1/api/gadget/:id/self-destruct` | self destruct gadget |

## Deployment
This API is deployed on Render. You may experience a 50-second delay when accessing the API after inactivity due to Render's free instance limitations.

**Live API:** https://gadget-api-9eqy.onrender.com

## API Documentation
https://documenter.getpostman.com/view/26083142/2sAYXEDxNA

## Contributing
Feel free to submit issues or pull requests to improve this project.

## License
This project is licensed under the MIT License.

