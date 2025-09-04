# Movie Management API (Node.js + Express)

A basic CRUD API with **Handler/Service/DAO** layers, **Joi** validation, **Swagger/OpenAPI 3.0** docs, and **Jest + Supertest** unit tests.

## Quick Start from docker

```bash
# 1) Docker Build
docker build -t movie-api-node .

# 2) Run container
docker run -d --name movie-api -p 3000:3000 movie-api-node

# -> http://localhost:3000
# -> Swagger docs: http://localhost:3000/docs

# 3) Stop container
docker stop [Container ID]

# 4) Remove container
docker rm [Container ID]
```

## Endpoints

- `GET /movies` — List all movies
- `GET /movies/{id}` — Get movie by ID
- `POST /movies` — Create a new movie
- `PUT /movies/{id}` — Update existing movie (partial allowed)
- `DELETE /movies/{id}` — Delete movie by ID

## Project Structure

```
src/
  app.js                 # Express app
  server.js              # Server bootstrap
  docs/swagger.js        # Swagger setup
  routes/movieRoutes.js  # Route definitions (+ OpenAPI annotations)
  controllers/           # Handlers (controller layer)
  services/              # Business logic (service layer)
  dao/                   # Data access (in-memory DAO)
  validations/           # Joi schemas & middlewares
  middleware/            # Error handler
  models/movie.js        # OpenAPI component schema (JSDoc)
tests/
  movieService.test.js
  movieRoutes.test.js
```

## Notes

- **In-memory storage** via a simple Map in `dao/movieDao.js`. Swap it with a real DB by replacing DAO methods.
- **Validation** uses Joi; POST requires `title` (string). `rating` range 1..10, `releaseYear` range 1878..3000.
- **PUT** accepts partial updates for simplicity; switch to PATCH if desired.
- **Error handling** is centralized in `middleware/errorHandler.js`.
```

