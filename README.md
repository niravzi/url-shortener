# URL Shortener Application

## Links

https://url.oriolus.io

## Project start

### Start in development mode

To start in development mode, you need to have local PostgreSQL database installed. Create `.env` file in `./backend` folder and specify `DATABASE_URL` and `FRONTEND_URL` variables there:

```sh
cd backend
touch .env
```

```
DATABASE_URL=postgresql://<USERNAME>:<PASWORD>@<HOST>:5432/postgres
FRONTEND_URL=http://localhost:5173
```

Apply database migrations:

```sh
npm run db:push
```

Seed database:

```sh
npm run db:seed
```

Start backend:

```sh
npm run start:dev
```

Navigate to `frontend` folder and start frontend application:

```sh
npm run dev
```

UI should be now accessible through http://localhost:5173

### Start in Docker

When starting in docker, you don't need to have local PostgreSQL database — it'll start in a separate container with docker-compose.

Navigate to `docker` folder and run:

```sh
docker-compose up
```
