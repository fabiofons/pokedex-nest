<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Run project in development env

1. Clone the repository

2. Run 
```pnpm install```

3. Had Nest CLI installed
```pnpm i -g @nestjs/cli```

4. Setup the DB
```docker-compose up -d```

5. Populate the DB with pokemons
```http://localhost:3000/api/v2/seed```

## Stack
* MongoDB
* NestJS
