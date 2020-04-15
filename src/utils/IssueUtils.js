module.exports = {
    open: (issue) => {
        if(issue.created_at === issue.updated_at){
            //ela acabou de ser criada
            return true
        }
        return false
    },

    getBranchId(title){
        const id = title.split('-')
        return id[0]
    }
}