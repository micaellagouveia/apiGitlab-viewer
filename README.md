# API de Integração do Gitlab com o Jira

Projeto de integração do Gitlab com o Jira.

## Webhooks
### 1. JIRA: /jira-webhook
1. Criação de uma pendência no projeto "Projeto de Teste de FLuxo PJe" do Jira.
2. A branch com o nome "TESTE-Nº-nome-pendência" vai ser criada no projeto "Playground" do Gitlab.
3. Na descrição da pendência, aparecerá o tribunal requisitante.
4. Uma verificação da descrição (template e anexos) será feita.


### 2. GITLAB: /close-jira-issue
1. As operações devem ser feitas na branch criada, e seu MR deve ser aberto, mudando o status da issue para Resolvida.
2. Se o MR for aprovado a issue será fechada, se for reprovado a issue será reaberta.

## Requerimentos
### Gitlab
1. Url da API.
2. Id do projeto.
3. Chave de autorização.

### Jira
1. Url da API
2. Autorização 'Basic Auth: {{username:password}}' codificado na base 64.
3. Transitions do seu projeto para mudança de status.

