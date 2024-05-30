## Setup guide
### Without docker
##### Prerequisites
  The setups steps expect following tools installed on the system.
  - Node: 18.x
  - Npm: 10.5
  - Postgres: 14.x

##### 1. Prepare environment variables
  ```
  # .env
  NODE_ENV=development
  PORT=3000
  JWT_SECRET=secret
  DATABASE_URL="postgresql://postgres:password@localhost:5432/be-dev-challenge?schema=public"
  ```

##### 2. Install modules
  ```
  npm install
  ```

##### 3. Setup database
  ```
  # Make sure the database from DATABASE_URL is existed
  npx prisma migrate deploy
  ```

##### 4 (Optional) Seed data
  ```
  npm run seed
  ```

##### 5. Start the nodejs server
  ```
  npm start
  ```
  The server will be running on localhost:3000
  (Optional) Visit swagger document on localhost:3000/api-docs
### With docker
##### 1. Start the nodejs server with docker-compose
  ```
  docker-compose up node-app
  ```
  The server will be running on localhost:3000
  (Optional) Visit swagger document on localhost:3000/api-docs
##### 2. (Optional) Seed data
  ```
  docker-compose exec node-app npm run seed
  ```

### Test with seed data
You can use one of following accounts to login to try out APIs, the default password is `password123`
- john@doe.com
- bill@gates.com
- trump@david.com
