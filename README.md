# CRUD-PETS

## AUTENTICAÇÃO

A api usa o KeyCloak para fazer o cadastro de usuários e login dos mesmos.
Modelo para exemplo do funcionamento.

![Minha Imagem](assets/IAM.png)


## LOGS DE REQUISIÇÃO

A api implementa um mecanismo de logging assíncrono para todas as requisições. Um middleware intercepta cada requisição, coletando informações relevantes como método HTTP, endpoint, parâmetros, tempo de resposta e código de status. Estes dados são enviados para uma fila no RabbitMQ, permitindo que a API continue atendendo às solicitações sem bloqueio.
Modelo para exemplo de funcionamento.

![Minha Imagem](assets/DiagramaRabbitMqLogging.drawio.png)



