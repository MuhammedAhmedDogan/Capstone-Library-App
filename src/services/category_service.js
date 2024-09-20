import axios from "axios";

const baseURL = import.meta.env.VITE_LIBRARY_APP_API_BASE_URL;
const apiURL = `${baseURL}/api/v1/categories`;

export const getCategories = async () => {
    try {
        const response = await axios.get(apiURL);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw new Error("Could not fetch categories");
    }
}