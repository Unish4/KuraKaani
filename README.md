# KuraKaani

A social media platform built as a microservices architecture.

## What is KuraKaani?

"KuraKaani" (कुराकानी) means "conversation" in Nepali. This project is a
social media backend where users share short posts, follow each other,
like and comment, receive notifications, and chat in real time.

## Architecture

Six services, one gateway, one MongoDB, RabbitMQ for events, Redis for
caching and rate limiting.

| Service | Port | Responsibility |
|---------|------|----------------|
| Gateway | 3000 | Single entry, routing, auth verify, rate limiting |
| Identity | 4001 | Users, profiles, follows, auth |
| Content | 4002 | Posts, comments, likes, feeds |
| Notification | 4003 | User notifications |
| Chat | 4004 | Direct messages |
| Media | 4005 | Uploads |

## Tech Stack

- Node.js (JavaScript, no TypeScript)
- Express
- MongoDB + Mongoose
- RabbitMQ (events)
- Redis (cache, rate limiting)
- Socket.io (real-time)
- Docker (development + deployment)

## Project Structure
kurakaani/
├── services/ # Each microservice
│ ├── gateway/
│ ├── identity/
│ ├── content/
│ ├── notification/
│ ├── chat/
│ └── media/
├── shared/ # Shared constants (event names, etc.)
├── docs/ # Architecture, decisions
└── docker-compose.yml # (Later phase)


## Running Locally

Each service is independent.

```bash
cd services/gateway
npm install
npm run dev

