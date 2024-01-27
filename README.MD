
# Microservices

Projeto de estudo para microserviços.


### Tech Stack

[Typescript](https://www.typescriptlang.org/)

[Postgres](https://www.postgresql.org/).

[Docker](https://docs.docker.com/desktop/install/mac-install/)

[Prisma](https://prisma.io/)

[RabbitMQ](https://www.rabbitmq.com/)


## Configurações iniciais

Cada microserviço é um projeto individual dentro do seu respectivo diretório dentro do repo (ex: fullcycle_microservices/ticket), e suas funcionalidades são descritas em seu próprio README. 


### Instalação do RabbitMQ

Para rodar uma instância do RabbitMQ, certifique-se de ter o docker instalado e rode o comando:

```bash
  # latest RabbitMQ 3.12 
  docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.12-management
```

[RabbitMQ reference.](https://www.rabbitmq.com/download.html)

### Inicialização do banco de dados


Foi utilizado o docker compose para criar o banco de dados, que está descrito no docker-compose.yml

```bash
  docker-compose up
```

## Rodando localmente

Para rodar local, entre no microserviço que deseja subir, suas configurações são descritas no seu README.

A migration do banco de dados acontece no microserviço de Tickets, ponto de entrada do projeto.


## Referência

 - [Fullcycle](https://www.youtube.com/watch?v=gtv9szE_P1U)

## Autores

- [@vitorramalho](https://github.com/vitor-ramalho)

