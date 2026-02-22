import { useState } from 'react'
import { useQuery, useMutation } from "@tanstack/react-query";
import { LIKE_PRODUCT_KEY, favProductsListUrl } from "~/constants";

const listIds = JSON.parse(localStorage.getItem(LIKE_PRODUCT_KEY) as string) || [];

export function useFavorites() {
    const [isFavorited, setIsFavorited] = useState<boolean>(false);

    const toggleFavorite = useMutation({
        mutationFn: async (productId: number) => {
            if (listIds.includes(productId)) {
                listIds.splice(listIds.indexOf(productId), 1);
            } else {
                listIds.push(productId);
            }
            localStorage.setItem(LIKE_PRODUCT_KEY, JSON.stringify(listIds));
            setIsFavorited(!isFavorited);
        },
        onSuccess: () => {
            setIsFavorited(!isFavorited);
        },
    })

    const fetchFavorites = useQuery({
        queryKey: ['favorites'],
        queryFn: async () => {
            return await fetch(favProductsListUrl(listIds.join(','))).then(res => res.json());
        },
        enabled:!!listIds.length,
    })

    const toggleFavoriteProduct = (productId: number) => {
        toggleFavorite.mutate(productId);
    }

    const isProductFavorited = (productId: number | undefined) => {
        return listIds.includes(productId);
    }

    return {
        isFavorited,
        toggleFavoriteProduct,
        favorites: fetchFavorites.data?.results || [],
        isLoading: fetchFavorites.isFetching,
        isError: fetchFavorites.isError,
        error: fetchFavorites.error,
        hasFavorites:!!listIds.length,
        isProductFavorited,
    }
}
