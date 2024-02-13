const BASE_URL = import.meta.env.VITE_BASE_URL

const urlConfig = {
    LOGIN_URL: `${BASE_URL}/api/auth/login`,
    SIGNUP_URL: `${BASE_URL}/api/auth/signup`,
    FORGET_PASSWORD_URL: `${BASE_URL}/api/auth/forgetPassword`, 
    LOGOUT_URL: `${BASE_URL}/api/auth/logout`,
    GET_PRODUCTS: `${BASE_URL}/api/product`,
    GET_CATEGORIES: `${BASE_URL}/api/product/categories`,
}

export default urlConfig;