module.exports = {
    getJson: () => {
        const endpoints = [
            {
                type: 'POST',
                endpoint: '/issue-webhook',
                JSON: {
                    object_attributes: {
                        iid: 'Integer',
                        state: 'String'
                    }
                },
                description: 'Receives an issue event webhook.',
            },
            {
                type: 'POST',
                endpoint: '/close-issue',
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
                endpoint: '/merge-webhook',
                JSON: {
                    object_attributes: {
                        iid: 'Integer',
                        state: 'String',
                        source_branch: 'String'
                    }
                },
                description: 'Receives a merge request event webhook.'
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