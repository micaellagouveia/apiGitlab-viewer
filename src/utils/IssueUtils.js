
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

    //Verifica se a descrição da issue está ok
    verifyIssue: async (description) => {
        let miss = ''
        const v1 = description.includes("Funcionalidade relacionada")
        const v2 = description.includes("Necessidade a ser atendida / Problema a ser solucionado")
        const v3 = description.includes("Passos para reprodução")
        const v4 = description.includes("Comportamento esperado, cenários possíveis")

        if (!v1 && !v2 && !v3 && !v4) return "Descrição não preenchida."
        else {

            if (!v1 || !v2 || !v3 || !v4) miss = await findMissParameter(v1, v2, v3, v4)

            const content = await verifyIssueContent(description)

            if (miss != '' || content != '') {
                const mensagem = `* Parâmetros faltantes na descrição:\n ${miss}\n\n${content}`
                return mensagem
            }
            else {
                return false
            }
        }
    }
}

//Encontra parâmetro do template da descrição faltante
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
    return miss.join('\n')
}

//Verifica se todos os parâmetros existentes estão preenchidos
function verifyIssueContent(description) {
    const h3 = description.split('h3. ')
    let index = 0
    let msg = ['']

    console.log('---------------------')
    console.log(h3)
    for (let i = 1; i < h3.length; i++) {
        let content = false

        let lines = h3[i].split('\r\n')
        console.log('++++++++++++++++++')
        console.log(lines)

        for (let j = 1; j < lines.length; j++) {
            if (lines[i] != '') {
                content = true
                break
            }
        }

        if (!content) {
            msg[index] = `* Campo { ${lines[0]} } não preenchido.`
            index++
        }
    }
    return msg.join('\n')
}