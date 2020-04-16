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
                description: 'Receives an issue event webhook',
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
                description: 'Receives an merge request event webhook and close issue related at the issue'
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
                description: 'Receives a merge request event webhook'
            }
        ]
        return endpoints
    }
}