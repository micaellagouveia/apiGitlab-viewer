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