#!/bin/bash

# Instala os pacotes e faz o build do projeto
yarn install
yarn build

# Executa as migrations no projeto
yarn typeorm migration:run

# Sobe a aplicação como desenvolvimento
yarn start:dev
