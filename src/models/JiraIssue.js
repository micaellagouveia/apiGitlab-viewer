module.exports = class JiraIssue {
    constructor(body){
        this.id = body.issue.id
        this.key = body.issue.key
    }
}