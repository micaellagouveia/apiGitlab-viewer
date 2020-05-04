require('dotenv/config');
const axios = require('axios')

module.exports = {

    closeIssue: async (issueId) => {
        const projectId = process.env.PROJECT_ID
        const params = {
            private_token: process.env.PRIVATE_TOKEN,
            state_event: 'close'
        }

        const response = await axios.put(`${process.env.GITLAB_API}/${projectId}/issues/${issueId}`, params)

        return response.data
    },

    createBranch: async (jiraKey, summary) => {

        const projectId = process.env.PROJECT_ID

        const params = {
            private_token: process.env.PRIVATE_TOKEN,
            branch: `${jiraKey}-${summary}`,
            ref: 'master'
        }

        const response = await axios.post(`${process.env.GITLAB_API}/${projectId}/repository/branches`, params)

        return response.data
    },

    statusIssue: async (issueKey, msg, id) => {
        const json = {
            update: { comment: [{ add: { body: msg } }] },
            transition: { id: id }
        }

        response = await axios({
            method: 'POST', url: `${process.env.JIRA_API}/issue/${issueKey}/transitions?expand=transitions.fields`,
            headers: { Authorization: `Basic ${process.env.AUTHORIZATION_KEY}` },
            data: json
        })

        return response.data

    },

    addTribunal: async (tribunal, issueKey, description) => {
        const newDescription = `h3. Tribunal Requisitante\r\n ${tribunal}\r\n\r\n` + description
        console.log('new description: \n')
        console.log(newDescription)
        const json = { fields: { description: newDescription } }
        response = await axios({
            method: 'PUT', url: `${process.env.JIRA_API}/issue/${issueKey}`,
            headers: { Authorization: `Basic ${process.env.AUTHORIZATION_KEY}` },
            data: json
        })

        return response.data

    }
}
/*Demandante
TSE
Contato: Renata Catão - 61 3030 9034

Perfil de uso do sistema
Secretário da sessão ("Assessor de plenário")

Funcionalidade relacionada
Relação de julgamento

Necessidade a ser atendida / Problema a ser solucionado
Ao criar uma sessão com possibilidade de criar blocos, selecionar a aba de criação de blocos, pequisar processos e selecionar para adicioná-los ao bloco, o sistema não abre a tela para que sejam fornecidas as informações do bloco.*/