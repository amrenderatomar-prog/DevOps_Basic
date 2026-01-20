# Secure-CRUD

A multi-container CRUD application built with Node.js, PostgreSQL, and Nginx reverse proxy, demonstrating production-grade containerization and DevOps practices.

## What is This?

This project is a task management API that demonstrates how to build a secure, scalable multi-container application. The system follows industry best practices with network isolation, where the application and database are completely isolated from direct access, and all traffic flows through an Nginx reverse proxy.

## Architecture

The application consists of three Docker containers:

- **Nginx Proxy** - Acts as a reverse proxy, the only service exposed to the host (port 80)
- **Node.js App** - Handles the business logic and CRUD operations (internal network only)
- **PostgreSQL Database** - Stores task data with persistent volumes (internal network only)

All services communicate through a private Docker network, ensuring the app and database are not directly accessible from the host machine.

## Tech Stack

- **Backend**: Node.js with Express
- **Database**: PostgreSQL 18.1
- **Proxy**: Nginx Alpine
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions

## Prerequisites

- Docker
- Docker Compose

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd DevOps_Basic
```

### 2. Create Environment File

Create a `.env` file in the project root directory with the following variables:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
POSTGRES_DB=devopsdb
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASS=yourpassword
DB_NAME=devopsdb
```

**Important**: Replace `yourpassword` with a strong password. The `.env` file is gitignored for security.

### 3. Deploy the Application

Run the automated deployment script:

```bash
chmod +x deploy.sh
./deploy.sh
```

Or manually start the services:

```bash
docker-compose up --build -d
```

### 4. Access the Application

The application will be available at:

```
http://localhost
```

## API Endpoints

All requests go through `http://localhost`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/tasks` | Create a new task |
| GET | `/tasks` | Get all tasks |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

### Example Usage

**Create a task:**
```bash
curl -X POST http://localhost/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Docker"}'
```

**Get all tasks:**
```bash
curl http://localhost/tasks
```

## Project Structure

```
.
├── src/                    # Application source code
│   ├── app.js             # Express server
│   ├── db.js              # Database connection
│   ├── routes/
│   │   └── task.route.js  # CRUD endpoints
│   └── package.json       # Node dependencies
├── nginx/
│   └── nginx.conf         # Nginx configuration
├── .github/
│   └── workflows/
│       └── docker-ci.yml  # CI/CD pipeline
├── docker-compose.yml     # Container orchestration
├── Dockerfile             # App container build
├── init.sql               # Database initialization
├── deploy.sh              # Deployment script
└── README.md
```

## How It Works

1. **Nginx** listens on port 80 (the only exposed port)
2. All requests are proxied to the Node.js app running on the internal network
3. The app processes requests and communicates with PostgreSQL
4. Data is persisted in Docker volumes, surviving container restarts

## Security Features

- **Network Isolation**: App and database are not exposed to the host
- **Non-root User**: Application runs as unprivileged user in containers
- **Environment Variables**: Sensitive credentials stored in `.env` file
- **Alpine Images**: Minimal base images reduce attack surface

## CI/CD Pipeline

The project includes automated GitHub Actions workflow that:

1. Triggers on every push to `main` branch
2. Builds the Docker image
3. Tags the image with `latest` and commit SHA
4. Pushes to Docker Hub

**Setup**: Add `DOCKER_USERNAME` and `DOCKER_PASSWORD` as GitHub repository secrets.

## Docker Hub

Docker image: `<your-dockerhub-username>/devops-app`

## Commands Reference

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Remove all data (including database)
docker-compose down -v

# Rebuild and restart
docker-compose up --build -d
```

## Troubleshooting

**Containers won't start**: Run `docker-compose down -v` to clean up, then redeploy.

**Database connection errors**: Wait 15-30 seconds for health checks to complete.

**Port 80 in use**: Stop any service using port 80 or modify the port in docker-compose.yml.

## Author

Amrendera Singh Tomar - https://github.com/amrenderatomar-prog

