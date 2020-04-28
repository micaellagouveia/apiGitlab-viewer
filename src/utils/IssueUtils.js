
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

    verifyIssue: async (description) => {

        console.log('---------------------------')
        console.log("Description: " + description)
        console.log('---------------------------')
        let miss = ''

        const v1 = description.includes("Funcionalidade relacionada")
        const v2 = description.includes("Necessidade a ser atendida / Problema a ser solucionado")
        const v3 = description.includes("Passos para reprodução")
        const v4 = description.includes("Comportamento esperado, cenários possíveis")

        if (!v1 && !v2 && !v3 && !v4) {
            return "Descrição não preenchida."
        }
        else {

            if (!v1 || !v2 || !v3 || !v4) miss = await findMissParameter(v1, v2, v3, v4)

            const content = await verifyIssueContent(description)

            if (miss != '' || content != '') {
                const mensagem = `* Parâmetros faltantes na descrição:\n ${miss}\n\n${content}`

                return mensagem
            }
            else{
                return false
            }

        }
    },
}

function findMissParameter(v1, v2, v3, v4) {
    let miss = []
    const verify = [v1, v2, v3, v4]
    let params = ["Funcionalidade relacionada",
        "Necessidade a ser atendida / Problema a ser solucionado",
        "Passos para reprodução",
        "Comportamento esperado, cenários possíveis"]

    for (let i = 0; i < verify.length; i++) {
        if (!verify[i]) miss.push(params[i])
    }
    console.log('miss array: ' + miss)
    return miss.join('\n')
}

function verifyIssueContent(description) {
    const h3 = description.split('h3. ')
    let index = 0
    let msg = ['']
    console.log('---------------------------')
    console.log("H3: " + h3)
    console.log('---------------------------')

    for (let i = 1; i < h3.length; i++) {

        let lines = h3[i].split('\r\n')
        if (!lines[1] || lines[1] === '') {
            msg[index] = `* Campo { ${lines[0]} } não preenchido.`
            index++
        }
    }
    return msg.join('\n')
}