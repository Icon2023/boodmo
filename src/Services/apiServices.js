import axios from "axios";

const BASE_URL = "http://192.168.100.123:8000"

export const AllProduct = async () => {
    const response = await axios.post(`${BASE_URL}/api/product`);
    if (response?.status) {
        return response.data;
    } else {
        console.log("error");
    }
}

export const Categories = async () => {
    const response = await axios.get(`${BASE_URL}/api/category`);
    if (response?.status) {
        return response.data;
    } else {
        console.log("error");
    }
}

export const SingleProductDetails = async (id) => {
    const response = await axios.get(`${BASE_URL}/api/product/${id}`);
    if (response?.status) {
        return response.data;
    } else {
        console.log("error");
    }
}