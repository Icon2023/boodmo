import axios from "axios";

const BASE_URL = "http://192.168.100.123:8000"

export const Product = async (data) => {
    const response = await axios.post(`${BASE_URL}/api/product/`, data);
    if (response?.status) {
        return response.data;
    } else {
        console.log("error");
    }
}

export const CheckOutProduct = async (data) => {
    const response = await axios.post(`${BASE_URL}/api/checkout/`, data);
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

export const CategoryProduct = async (id) => {
    const response = await axios.get(`${BASE_URL}/api/category/${id}`);
    if (response?.status) {
        return response.data;
    } else {
        console.log("error");
    }
}

export const CarCompines = async () => {
    const response = await axios.get(`${BASE_URL}/api/car-companies`);
    if (response?.status) {
        return response.data;
    } else {
        console.log("error");
    }
}

export const CarModel = async (id) => {
    const response = await axios.get(`${BASE_URL}/api/car-companies/${id}`);
    if (response?.status) {
        return response.data;
    } else {
        console.log("error");
    }
}

export const CarYear = async (data) => {
    const response = await axios.get(`${BASE_URL}/api/car-companies/${data.carValName}/${data.val}`);
    if (response?.status) {
        return response.data;
    } else {
        console.log("error");
    }
}
export const CarMode = async (data) => {
    const response = await axios.get(`${BASE_URL}/api/car-companies/${data.carValName}/${data.carValYear}/${data.val}`);
    if (response?.status) {
        return response.data;
    } else {
        console.log("error");
    }
}

export const CarCompanies = async () => {
    const response = await axios.get(`${BASE_URL}/api/car-companies`);
    if (response?.data) {
        return response.data;
    } else {
        console.log("error");
    }
}

export const Brands = async () => {
    const response = await axios.get(`${BASE_URL}/api/brand`);
    if (response?.data) {
        return response.data;
    } else {
        console.log("error");
    }
}

export const LogIn = async (data) => {
    const response = await axios.post(`${BASE_URL}/api/login`, data);
    if (response?.data) {
        return response.data;
    } else {
        console.log("login error");
    }
};

export const Register = async (data) => {
    const response = await axios.post(`${BASE_URL}/api/register`, data);
    if (response?.data) {
        return response.data;
    } else {
        console.log("login error");
    }
};