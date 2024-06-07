import { postWithHeaders } from "./config";

const PlayerPATH = "/prode/topFourCountriesPrediction"
const AdminPATH = "/prode/topFourCountriesRanking"

export const createUserTopFourPredictionDB = async (data) => {
    const url = `${PlayerPATH}/create`
    try {
        const response = await postWithHeaders(url, data)
        return response.data
    } catch (error) {
        throw error.response
    }
}

export const createAdminTopFourPredictionDB = async (data) => {
    const url = `${AdminPATH}/create`
    try {
        const response = await postWithHeaders(url, data)
        return response.data
    } catch (error) {
        throw error.response
    }
}