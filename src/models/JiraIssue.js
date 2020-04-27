module.exports = class JiraIssue {
    
    constructor(body) {
        this.id = body.issue.id
        this.key = body.issue.key
        this.userKey = body.user.key
        this.webhookEvent = body.webhookEvent
        this.reporter = body.issue.fields.reporter
        this.priority = body.issue.fields.priority
        this.labels = body.issue.fields.labels
        this.assignee = body.issue.fields.assignee
        this.status = body.issue.fields.status
        this.creator = body.issue.fields.creator
        this.aggregateprogress = body.issue.fields.aggregateprogress
        this.progress = body.issue.fields.progress
        this.votes = body.issue.fields.votes
        this.worklog = body.issue.fields.worklog
        this.project = body.issue.fields.project
        this.issuetype = body.issue.fields.issuetype
        this.description = body.issue.fields.description
    }
}