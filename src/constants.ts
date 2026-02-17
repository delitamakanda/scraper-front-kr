const apiBaseURL = import.meta.env.VITE_API_BASE_URL;

export const endpoint = `${apiBaseURL}/`;

export const userMailingURL = `${endpoint}signup/`;
export const weatherUrl = `${endpoint}weather/`;
export const productsListUrl = `${endpoint}products/`;
export const favProductsListUrl = (productIds: string) => `${endpoint}products/?id__in=${productIds}`;

export const LIKE_PRODUCT_KEY = 'likedProducts';

export const debounceTime = 300;