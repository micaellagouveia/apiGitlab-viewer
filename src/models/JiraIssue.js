module.exports = class JiraIssue {
    constructor(body) {
        this.key = body.issue.key
        this.webhookEvent = body.webhookEvent
        this.eventType = body.issue_event_type_name
        this.reporter = body.issue.fields.reporter.name
        this.project = body.issue.fields.project.name
        this.description = body.issue.fields.description
        this.files = body.issue.fields.attachment
        this.summary = body.issue.fields.summary
    }
}