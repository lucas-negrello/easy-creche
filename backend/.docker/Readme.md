# Passos para rodar o projeto Easy Creche localmente:

- Copie o arquivo `.env.example` para um arquivo `.env`:

```bash
    cp .env.example .env
```

- Edite o arquivo `.env` para que contenha os caminhos corretos para sua aplicação e seus volumes

- Rode o comando para criar os containers da aplicação

```bash
  docker compose up --build -d
```

- Dentro do terminal da aplicação no docker (app-1), rode o seguinte comando:

```bash
    php artisan migrate
```

- Sua api estará rodando em:

    http://localhost:8084/api
