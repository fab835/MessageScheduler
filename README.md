# MessageScheduler

Monorepo project for a scheduled iMessage delivery platform. It has Event-Driven Architecture.

The current project structures the shared infrastructure and the flow of backend events:

- `api`: Prisma + PostgreSQL. Backend to validate, store and return messages.
- `web`: Next.js. UI to schedule a new message and list all messages.
- `kafka`: Message Broker to communicate between microservices.
- `scheduler`: Node.js service with cron jobs. Search scheduled messages per minute.
- `imessage-gateway`: Node.js service that simulates iMessage sending. It has a randon delay and a randon status success and fail response.

## Description

The platform is designed to let users schedule outbound messages, track delivery progress, and operate a queue-backed messaging workflow. The backend currently includes:

- a simplified message-only API
- a scheduler that emits dispatch events for due queued messages
- a demo iMessage gateway that simulates sending and failure events
- Redis-ready dashboard caching
- Kafka-backed dispatch events

## How To Setup
Use docker to setup all services

1. Copy the environment template:

```bash
cp .env.example .env
cp api/.env.example api/.env
```

2. DB Migrate (First init)
```bash
docker compose run --rm api npm install
docker compose run --rm api npm run prisma:migrate:dev -- --name init
```

3. Start the infrastructure and services:

```bash
docker compose up --build
```

The API runs on `http://localhost:3333`.
The Web UI runs on `http://localhost:3000`.

## Project Structure

```text
.
├── api/
├── web/
├── scheduler/
├── imessage-gateway/
└── docker-compose.yml
```