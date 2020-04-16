module.exports = {

    getIssueId(merge){
        const branch = String(merge.source_branch)
        const array = branch.split('-')
        const issueId = array[0]
        return issueId
    },

}