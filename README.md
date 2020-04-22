# API de Integração do Gitlab com o Jira

Projeto de integração do Gitlab com o Jira.

## Webhooks
### 1. JIRA: /jira-webhook
1. Criação de uma pendência no projeto "Projeto de Teste de FLuxo PJe" do Jira.
2. A branch com o nome "TESTE-Nº-branch" vai ser criada no projeto "Playground" do Gitlab.


### 2. GITLAB: /close-jira-issue
1. As operações devem ser feitas na branch criada, e seu MR deve ser aberto.
2. Após MR da branch for aprovado, uma mensagem é enviada para a issue do Jira informando que já foi resolvido, e que a pendência já pode ser fechada.

