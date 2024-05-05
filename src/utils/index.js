import { BASE_URL } from "../api"

export const getImageURL = (url) => {
    return `${BASE_URL}${url}`
}