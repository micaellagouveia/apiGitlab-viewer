
module.exports = {
    getJiraIssueKey: (merge) => {
        const array = String(merge.source_branch).split('-')
        const jiraIssueKey = array[0] + '-' + array[1]
        return jiraIssueKey
    },

    verifyIssue: (description, files) => {
        let miss = ''
        const v1 = description.includes("Funcionalidade relacionada")
        const v2 = description.includes("Necessidade a ser atendida / Problema a ser solucionado")
        const v3 = description.includes("Passos para reprodução")
        const v4 = description.includes("Comportamento esperado, cenários possíveis")

        // Nenhum parâmetro escrito
        if (!v1 && !v2 && !v3 && !v4)
            return "Descrição não preenchida."

        // Se algum dos parâmetros não estiver escrito
        if (!v1 || !v2 || !v3 || !v4)
            miss = findMissParam(v1, v2, v3, v4)

        // Verificação do conteúdo dos parâmetros existentes
        const content = verifyIssueContent(description)

        const annex = verifyFiles(files)

        // Se algo faltar, retorna a msg
        if (annex || miss != '' || content != '')
            return `${annex}${miss}\n${content}`

        // Se tudo estiver ok
        return false
    }
}


//Encontra parâmetro do template da descrição faltante
function findMissParam(v1, v2, v3, v4) {
    let miss = []
    const verify = [v1, v2, v3, v4]
    let params = [
        "Funcionalidade relacionada",
        "Necessidade a ser atendida / Problema a ser solucionado",
        "Passos para reprodução",
        "Comportamento esperado, cenários possíveis"]

    for (let i = 0; i < verify.length; i++) {
        if (!verify[i]) miss.push(params[i])
    }
    return `* Parâmetros faltantes na descrição:\n ${miss.join('\n')}\n`
}

//Verifica se todos os parâmetros existentes estão preenchidos
function verifyIssueContent(description) {
    const h3 = description.split('h3. ')
    let index = 0
    let msg = ['']

    for (let i = 1; i < h3.length; i++) {
        let content = false
        let lines = h3[i].split('\r\n')

        for (let j = 1; j < lines.length; j++) {
            if (lines[j] != '') {
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

function verifyFiles(files) {
    console.log(files)
    if (files) return false
    return '* Não há arquivos anexados.\n\n'
}
