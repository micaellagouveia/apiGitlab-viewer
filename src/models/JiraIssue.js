module.exports = class JiraIssue {
    
    constructor(body) {
        this.id = body.issue.id
        this.key = body.issue.key
        this.userKey = body.user.key
        this.webhookEvent = body.webhookEvent
        this.reporter = body.issue.fields.reporter.name
        this.priority = body.issue.fields.priority.name
        this.labels = body.issue.fields.labels
        this.assignee = body.issue.fields.assignee.name
        this.status = body.issue.fields.status.id
        this.creator = body.issue.fields.creator.name
        this.aggregateprogress = body.issue.fields.aggregateprogress
        this.progress = body.issue.fields.progress
        this.votes = body.issue.fields.votes.votes
        this.worklog = body.issue.fields.worklog
        this.project = body.issue.fields.project.name
        this.issuetype = body.issue.fields.issuetype.name
        this.description = body.issue.fields.description
        this.files = body.issue.fields.attachment
    }
}