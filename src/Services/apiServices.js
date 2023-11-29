import axios from "axios";
import authHeader from "./apiHeader";

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
    const response = await axios.post(`${BASE_URL}/api/checkout`, data);
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

export const Add_Tocart_Login = async (data) => {
    const response = await axios.post(`${BASE_URL}/api/cart`, data, { headers: authHeader() });
    if (response?.data) {
        return response.data;
    } else {
        console.log("login error");
    }
};

export const CartList = async () => {
    const response = await axios.get(`${BASE_URL}/api/listcart`, { headers: authHeader() });
    if (response?.data) {
        return response.data;
    } else {
        console.log("error");
    }
}

export const CartLoginDelete = async (id) => {
    const response = await axios.delete(`${BASE_URL}/api/cart/${id}`, { headers: authHeader() });
    if (response?.data) {
        return response.data;
    } else {
        console.log("error");
    }
}

export const AddOrderList = async () => {
    const response = await axios.get(`${BASE_URL}/api/order`, { headers: authHeader() });
    if (response?.data?.success) {
        return response.data;
    } else {
        console.log("error");
    }
}

export const AddReviewList = async (data) => {
    const response = await axios.post(`${BASE_URL}/api/reviews`, data, { headers: authHeader() });
    if (response?.data?.success) {
        return response.data;
    } else {
        console.log("error");
    }
}

export const GetAddressUser = async () => {
    const response = await axios.get(`${BASE_URL}/api/address`, { headers: authHeader() });
    if (response?.data?.success) {
        return response.data;
    } else {
        console.log("error");
    }
}


export const AddAddressUser = async (data) => {
    const response = await axios.post(`${BASE_URL}/api/addresses`, data, { headers: authHeader() });
    if (response?.data?.success) {
        return response.data;
    } else {
        console.log("error");
    }
}

export const DeleteAddress = async (id) => {
    const response = await axios.get(`${BASE_URL}/api/delete-address/${id}`, { headers: authHeader() });
    console.log(response);
    if (response?.data) {
        return response.data;
    } else {
        console.log("error");
    }
}

export const Coupon = async () => {
    const response = await axios.get(`${BASE_URL}/api/coupon`);
    if (response?.data?.success) {
        return response.data;
    } else {
        console.log("error");
    }
}

export const GetCouponCode = async (data) => {
    const response = await axios.get(`${BASE_URL}/api/coupon/${data}`, data);
    if (response?.data) {
        return response.data;
    } else {
        console.log("error");
    }
}

export const WishListLogin = async () => {
    const response = await axios.get(`${BASE_URL}/api/get-product-from-watchlist`, { headers: authHeader() });
    if (response?.data?.success) {
        return response.data;
    } else {
        console.log("error");
    }
}


export const WishListLoginDelete = async (data) => {
    const response = await axios.post(`${BASE_URL}/api/add-remove-watchlist`, data, { headers: authHeader() });
    console.log(response);
    if (response?.data?.success) {
        return response.data;
    } else {
        console.log("error");
    }
}


//  Order List ========================================================================================================================

export const OrderList = async (data) => {
    const response = await axios.post(`${BASE_URL}/api/make-orderid`, data);
    if (response?.data?.success) {
        return response.data;
    } else {
        console.log("error");
    }
}

export const OrderComplete = async (data) => {
    const response = await axios.post(`${BASE_URL}/api/complete-order`, data , { headers: authHeader() });
    if (response?.data?.success) {
        return response.data;
    } else {
        console.log("error");
    }
}


export const BrandProduct = async (id) => {
    const response = await axios.get(`${BASE_URL}/api/brand/${id}`);
    if (response?.status) {
        return response.data;
    } else {
        console.log("error");
    }
}