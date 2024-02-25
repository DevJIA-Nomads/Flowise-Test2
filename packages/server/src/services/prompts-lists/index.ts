import axios from 'axios'

const createPromptsList = async (requestBody: any) => {
    try {
        const tags = requestBody.tags ? `tags=${requestBody.tags}` : ''
        // Default to 100, TODO: add pagination and use offset & limit
        const url = `https://api.hub.langchain.com/repos/?limit=100&${tags}has_commits=true&sort_field=num_likes&sort_direction=desc&is_archived=false`
        axios.get(url).then((response) => {
            if (response.data.repos) {
                return { status: 'OK', repos: response.data.repos }
            }
        })
    } catch (error) {
        throw new Error(`Error: promptsListsService.createPromptsList - ${error}`)
    }
}

export default {
    createPromptsList
}
