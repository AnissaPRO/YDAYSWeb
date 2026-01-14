# NestJS Shader Community Backend

This is a modular backend project built with NestJS for a community website focused on shaders. The project is structured into three main modules: Users, Shaders, and Gamification. It uses TypeORM with PostgreSQL for data management and includes a Docker setup for easy deployment.

## Project Structure

```
nestjs-shader-community-backend
├── src
│   ├── app.module.ts
│   ├── main.ts
│   ├── config
│   │   └── database.config.ts
│   ├── modules
│   │   ├── users
│   │   │   ├── dto
│   │   │   │   └── create-user.dto.ts
│   │   │   ├── entities
│   │   │   │   └── user.entity.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.module.ts
│   │   │   └── users.service.ts
│   │   ├── shaders
│   │   │   ├── dto
│   │   │   │   └── create-shader.dto.ts
│   │   │   ├── entities
│   │   │   │   └── shader.entity.ts
│   │   │   ├── shaders.controller.ts
│   │   │   ├── shaders.module.ts
│   │   │   └── shaders.service.ts
│   │   └── gamification
│   │       ├── dto
│   │       │   └── create-achievement.dto.ts
│   │       ├── entities
│   │       │   └── achievement.entity.ts
│   │       ├── gamification.controller.ts
│   │       ├── gamification.module.ts
│   │       └── gamification.service.ts
│   └── common
│       └── filters
│           └── http-exception.filter.ts
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- Docker
- PostgreSQL

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd nestjs-shader-community-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the database and MinIO services using Docker:
   ```
   docker-compose up -d
   ```

### Running the Application

To start the application, run:
```
npm run start:dev
```

### API Endpoints

- **Users Module**
  - Create User: `POST /users`
  - Get Users: `GET /users`

- **Shaders Module**
  - Create Shader: `POST /shaders`
  - Get Shaders: `GET /shaders`

- **Gamification Module**
  - Create Achievement: `POST /achievements`
  - Get Achievements: `GET /achievements`

### License

This project is licensed under the MIT License.