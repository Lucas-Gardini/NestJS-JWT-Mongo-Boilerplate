## Descrição <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="32" alt="Nest Logo" /></a>

[NestJS](https://github.com/nestjs/nest) Boilerplate com autenticação JWT e conexão banco de dados MONGODB

## Instalação

```bash
$ yarn install
```

## Rodando a aplicação

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# build
$ yarn build

# production mode
$ yarn start:prod
```

## Autenticação
```bash
POST /auth/login
```

Usuário padrão definido no arquivo .env, ele é criado automaticamente quando a aplicação é iniciada.
```json
{
  "email": "master@nestjs.com",
  "password": "default"
}
```

## Testando a autenticação

```bash
GET /auth/info
```
Lembre-se de passar o token JWT no header (Authorization Bearer ...) da requisição.

## Imporante!
Lembre-se de alterar a secret key do JWT no arquivo .env, utilize uma chave segura e única.

## Suporte

Tem alguma dúvida? Abra uma issue ou entre em contato comigo!
