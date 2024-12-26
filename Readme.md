# Funcify

Funcify is a lightweight Function-as-a-Service (FaaS) platform that allows you to deploy and run isolated serverless functions in the cloud. With auto-scaling capabilities and an intuitive CLI, Funcify simplifies the deployment and execution of functions while optimizing resource utilization.

---

## Features

- **Deploy Functions**: Upload your functions to the cloud, deploy them, and get a URL for execution.
- **Run Functions**: Execute your deployed functions directly using the provided URL.
- **Auto Scaling**: Automatically scales up or down based on system load using RabbitMQ and Docker containers.
- **Logs and Metrics**: Access detailed logs and performance metrics for each function.
- **CLI Tool**: Simplify interaction with the platform for authentication, deployment, and execution.

---

## Architecture

![Screenshot 2024-12-26 223229](https://github.com/user-attachments/assets/aa194e3b-5371-4969-85d9-0af5ae863842)


1. **Users**: 
   - Users interact with the platform using a CLI or direct API calls.

2. **Blob Storage**: 
   - Stores function code uploaded by users (e.g., AWS S3).

3. **Main Server**: 
   - Handles metadata storage in the database.
   - Consumes tasks from the queue.
   - Dynamically launches Docker containers to execute the functions.

4. **Message Queue**: 
   - RabbitMQ/Kafka manages function execution requests.

5. **Database**: 
   - Stores metadata about deployed functions (e.g., user details, function endpoints).

6. **Execution Environment**: 
   - Launches Docker containers with suitable runtime environments to execute the code.

7. **Auto Scaling**: 
   - Horizontally scales the main server instances based on queue length and demand.

---

## Tech Stack

- **Backend**: Node.js (Express.js for APIs)
- **Queue System**: RabbitMQ/Kafka
- **Containerization**: Docker
- **Cloud Storage**: AWS S3 (or equivalent)(currently stores file locally)
- **Database**: MongoDB (or any NoSQL/SQL database)
- **CLI Tool**: Node.js-based CLI interface

---

## Installation

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Sahiiil1406/Funcify.git
   cd funcify
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - RabbitMQ/Kafka connection details
   - Database URL
   -PORT number

4. Start the server:
   ```bash
   npm start
   ```

### CLI Tool Setup

1. Install the CLI globally:
   ```bash
   npm install -g 
   ```

2. Authenticate and start deploying functions:
   ```bash
   funcify login
   funcify deploy --file <path-to-function-file>
   ```

---

## Usage

### Deploy a Function

Use the CLI to deploy your function:
```bash
funcify deploy --file <path-to-function.js>
```

### Run a Function

Execute the deployed function using the provided URL:
```bash
curl -X POST <function-url> -d '{"key": "value"}' -H "Content-Type: application/json"
```

### View Logs

Retrieve logs for your function:
```bash
funcify logs --function <function-name>
```
