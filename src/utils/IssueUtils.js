module.exports = {

    getIssueId: (merge) => {
        const issueId = String(merge.source_branch).split('-')
        return issueId[1]
    },
    
    getJiraIssueKey: (merge) => {
        const array = String(merge.source_branch).split('-')
        const jiraIssueKey = array[0] + '-' + array[1]
        return jiraIssueKey

    }

}