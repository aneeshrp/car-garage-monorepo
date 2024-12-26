# Car Garage SaaS Application

A monorepo for the Car Garage SaaS Application built using Node.js, MongoDB, and RabbitMQ with a microservices architecture. This application streamlines garage operations, including user authentication, inventory management, job tracking, invoicing, and reporting.

## Features

- User authentication and role-based access control.
- Inventory management for spare parts and bulk items.
- Job tracking with status updates and third-party integration.
- Invoice generation and GST-inclusive/exclusive transactions.
- Reporting for inventory, jobs, employee hours, and finances.
- Built using SOLID principles and TDD.
- Designed with scalability and Agile methodology.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Message Broker**: RabbitMQ
- **Dev Tools**: Docker, Nx, Jest
- **Deployment**: AWS EC2

## Prerequisites

- Node.js >= 16.x
- MongoDB >= 5.x
- Docker (optional, for containerized setup)
- RabbitMQ (for asynchronous message processing)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/car-garage-monorepo.git
   cd car-garage-monorepo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the services:

   - Run the `auth-service`:
     ```bash
     cd apps/auth-service
     npm start
     ```
   - Add more services as you build them.

## Usage

1. Start the application locally by running:

   ```bash
   npm start
   ```

2. Access the application at:

   - **Auth Service**: `http://localhost:3001`
   - Add other services as they are built.

3. API documentation will be available soon.

## Project Structure

```
.
├── apps/
│   ├── auth-service/         # Handles user authentication
│   ├── inventory-service/    # Manages inventory and spare parts
│   ├── job-service/          # Tracks jobs and tasks
├── libs/                     # Shared libraries and utilities
├── tests/                    # Centralized test cases
├── tools/                    # Custom scripts and tools
├── docker-compose.yml        # Docker configuration for local setup
└── nx.json                   # Nx workspace configuration
```

## Contributing

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message"
   ```
4. Push to your branch and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please contact:

- Name: Your Name
- Email: [your.email@example.com](mailto\:your.email@example.com)


