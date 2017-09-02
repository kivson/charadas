# Charadas

Charadas é uma API aberta que traz uma piada/charada aleatória a cada consulta.
Foi feita pensando nas piadas ruins que a Google Assistente conta =].
Roda atualmente no Google Cloud Functions e as charadas foram extraídas através de web crawling.

Você pode visualizar uma piada aleatória abrindo:
https://us-central1-kivson.cloudfunctions.net/charada-aleatoria

Este foi um projeto para aprender um pouco sobre Google Cloud Functions e crawling com o NodeJs.

## Uso

Para ver uma piada aleatória basca acessar https://us-central1-kivson.cloudfunctions.net/charada-aleatoria

Para receber ela em JSON é só adicionar o header 'Accept: application/json' 

Exemplo de retorno:
```json
{
	"id": 637,
	"pergunta": "O que é que a televisão foi fazer no dentista?",
	"resposta": "Tratamento de canal."
}
```
