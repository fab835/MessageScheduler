# API

Fastify API for MessageScheduler.

## Description

The API is responsible for:

- persisting message scheduling state in PostgreSQL through Prisma
- exposing simple message scheduling endpoints
- preparing dashboard visibility data for the frontend

## How To Setup

```bash
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate:dev
npm run dev
```

## Project Structure

```text
src
├── business
│   ├── entities
│   ├── interactors
│   └── use-cases
├── controllers
├── helpers
├── models
├── routes
└── spec
```

## How To Test

```bash
npm run lint
npm run test
npm run test:e2e
```
