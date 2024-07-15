# Migrations
## Criar
Para criar uma migration, rode o comando

```sh
$ npx typeorm migration:create src/migrations/{nome-do-arquivo-da-nova-mutation}
```

O nome do arquivo deve ser colocado sem a extensão.

## Run
O comando para rodar uma migration é 

```sh
$ yarn run typeorm migration:run
```

## Revert
O comando para reverter uma migration é 

```sh
$ yarn run typeorm migration:revert
```