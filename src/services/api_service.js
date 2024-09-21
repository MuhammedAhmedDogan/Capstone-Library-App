import axios from "axios";

const baseURL = import.meta.env.VITE_LIBRARY_APP_API_BASE_URL;
const apiURL = `${baseURL}/api/v1`;

export const getList = async (page) => {
    try {
        const response = await axios.get(`${apiURL}/${page}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching list data:", error);
        throw new Error(`Could not fetch data for page: ${page}`);
    }
};

export const getById = async (page, id) => {
    try {
        const response = await axios.get(`${apiURL}/${page}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data by ID:", error);
        throw new Error(`Could not fetch data for page: ${page}, ID: ${id}`);
    }
};

export const addData = async (page, obj) => {
    try {
        const response = await axios.post(`${apiURL}/${page}`, obj);
        return response.data;
    } catch (error) {
        console.error("Error adding data:", error);
        throw new Error(`Could not add data to page: ${page}`);
    }
};

export const updateData = async (page, id, obj) => {
    try {
        const response = await axios.put(`${apiURL}/${page}/${id}`, obj);
        return response.data;
    } catch (error) {
        console.error("Error updating data:", error);
        throw new Error(`Could not update data for page: ${page}, ID: ${id}`);
    }
};

export const deleteData = async (page, id) => {
    try {
        const response = await axios.delete(`${apiURL}/${page}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting data:", error);
        throw new Error(`Could not delete data for page: ${page}, ID: ${id}`);
    }
};