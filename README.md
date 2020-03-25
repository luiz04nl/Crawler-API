# Crawler API

Crawler API de Luiz Carlos Douglas de Jesus

## Url de Mock do endpoint

https://d944a506-50d9-4c0e-91f1-025ab2a77d1a.mock.pstmn.io

## Exemplo de chamada no endpotin de mock

```
curl --location --request POST 'https://d944a506-50d9-4c0e-91f1-025ab2a77d1a.mock.pstmn.io/api/product' \
--header 'Content-Type: application/json' \
--data-raw '{
	"search": "ps4 pro",
	"limit": 5
}'
```

## Instalar dependências

```
yarn
```

## Iniciar localmente

```
yarn start
```

## Lint

```
yarn lint
```

## Testes unitários

```
yarn unit
```

## Teste de intergracão pelo postman

```
yarn test-integration-postman
```

## Iniciar imagem docker

```
docker run --name crawler-api -p 3000:3000 -d luiz04nl/crawler-api:1
```
