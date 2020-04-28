module.exports = {

    getIssueId: (merge) => {
        const issueId = String(merge.source_branch).split('-')
        return issueId[1]
    },

    getJiraIssueKey: (merge) => {
        const array = String(merge.source_branch).split('-')
        const jiraIssueKey = array[0] + '-' + array[1]
        return jiraIssueKey
    },

    verifyIssueTemplate: (description) => {

        console.log('---------------------------')
        console.log("Description: " + description)
        console.log('---------------------------')

        const v1 = description.includes("Funcionalidade relacionada")
        const v2 = description.includes("Necessidade a ser atendida / Problema a ser solucionado")
        const v3 = description.includes("Passos para reprodução")
        const v4 = description.includes("Comportamento esperado, cenários possíveis")

        if (v1 && v2 && v3 && v4) return true

        return false
    },

    verifyIssueContent: (description) => {
        const h3 = description.split('h3. ')
        let msg = 'Todos os campos estão preenchidos.'
        console.log('---------------------------')
        console.log("H3: " + h3)
        console.log('---------------------------')

        for (let i = 1; i < h3.length; i++) {

            let lines = h3[i].split('\r\n')
            console.log("line: " + lines)

            if (!lines[1] || lines[1] === '') {
                msg = `Campo < ${lines[0]} > não preenchido.`
                return msg
            }
        }
        return msg
    }
}