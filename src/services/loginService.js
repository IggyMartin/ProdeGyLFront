import { postWithHeaders } from "./config";

const PATH = '/auth'

export const loginUserDB = async (data) => {
    const url = `${PATH}/login`
    try {
        const response = await postWithHeaders(url, data)
        return response.data
    } catch (error) {
        throw error.response
    }
}