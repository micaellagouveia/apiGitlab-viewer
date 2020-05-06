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
                description: 'Recebe merge request webhook e altera o status da issue relacionada de acordo com o state do merge.'
            },
            {
                type: 'POST',
                endpoint: '/jira-webhook',
                JSON: {
                    webhookEvent: 'String',
                    issue_event_type_name: 'String',
                    issue: {
                        key: 'String',
                        fields: {
                            description: 'String',
                            attachment: 'Array',
                            summary: 'String',
                            project: {
                                name: 'String'
                            },
                            reporter: {
                                name: 'String'
                            }
                        }
                    }
                },
                description: 'Recebe uma "jira:issue_created webhook event" ou "issue_updated issue_event_type_name". Cria branch no gitlab, verifica descrição da issue.'  

            }
        ]
        return endpoints
    }
}