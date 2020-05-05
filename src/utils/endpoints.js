module.exports = {
    getJson: () => {
        const endpoints = [    
            {
                type: 'POST',
                endpoint: '/close-jira-issue',
                JSON: {
                    object_attributes: {
                        iid: 'Integer',
                        state: 'String',
                        source_branch: 'String'
                    }
                },
                description: 'Receives an merge request event webhook and close jira issue related at.'
            },
            {
                type: 'POST',
                endpoint: '/close-gitlab-issue',
                JSON: {
                    object_attributes: {
                        iid: 'Integer',
                        state: 'String',
                        source_branch: 'String'
                    }
                },
                description: 'Receives an merge request event webhook and close gitlab issue related at.'
            },
            {
                type: 'POST',
                endpoint: '/jira-webhook',
                JSON: {
                    object_attributes: {
                        webhookEvent: 'String',
                        user: {
                            key: 'String'
                        },
                        issue: {
                            key: 'String'
                        }
                    }
                },
                description: 'Receives an jira:issue-created event webhook and created a branch related at on Gitlab.'
            }
        ]
        return endpoints
    }
}
/* Funcionalidade relacionada
Automatização da interação Gitlab e Jira

Necessidade a ser atendida / Problema a ser solucionado
Verificação da descrição, tribunal requisitante, mudança de status de acordo com o MR.

Passos para reprodução
1. Criar issue no Jira.
2. Criar MR no gitlab da branch relacionada.
3. De acordo com o resultado do MR, o status será modificado.
4. Preencher a descriçã corretamente, se não aparecerá nos comentários aquilo que está pendente.

Comportamento esperado, cenários possíveis
Teste*/