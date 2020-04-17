module.exports = class JiraIssue {
    constructor(body) {
        this.id = body.issue.id
        this.key = body.issue.key
        this.summary = body.issue.fields.summary
        this.webhookEvent = body.webhookEvent
    }
}