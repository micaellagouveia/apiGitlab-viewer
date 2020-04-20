module.exports = {

    getIssueId: (merge) => {
        const issueId = String(merge.source_branch).split('-')
        return issueId[1]
    },
    
    getJiraIssueId: (merge) => {
        const array = String(merge.source_branch).split('-')
        const jiraIssueId = array[0] + '-' + array[1]
        return jiraIssueId

    }

}