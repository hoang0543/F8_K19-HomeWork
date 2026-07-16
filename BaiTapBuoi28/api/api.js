const API_URL = "https://dummyjson.com"

const post = async (endpoint, body) => {
    try {
        const response = await fetch(
            `${API_URL}/${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify(body)
            }
        )
        return await response.json()
    } catch (error) {
        alert ('post data failed')
    }
}
const get = async (endpoint) => {
    try {
        const response = await fetch(
            `${API_URL}/${endpoint}`
        )
        return await response.json()
    } catch (error) {
        alert ('get data failed')
    }
}

export { get, post }