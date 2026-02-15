import { describe, it, expect } from "vitest";
import {
    endpoint,
    userMailingURL,
    weatherUrl,
    productsListUrl,
    favProductsListUrl,

} from "./constants"

describe('constants', () => {
    describe('endpoint', () => {
        it('should be a string', () => {
            expect(typeof endpoint).toBe('string');
        })
        it('should construct user mailing URL correctly', () => {
            expect(userMailingURL).toBe(endpoint + 'signup/');
        })
        it('should construct weather URL correctly', () => {
            expect(weatherUrl).toBe(endpoint + 'weather/');
        })
        it('should construct products list URL correctly', () => {
            expect(productsListUrl).toBe(endpoint + 'products/');
        })
        it('should construct fav products list URL correctly', () => {
            const productIds = '1,2,3';
            expect(favProductsListUrl(productIds)).toBe(endpoint + 'products/?id__in=1,2,3');
        })
        it('should construct fav products list URL correctly when no productIds are provided', () => {
            expect(favProductsListUrl('')).toBe(endpoint + 'products/?id__in=');
        })
    })
})