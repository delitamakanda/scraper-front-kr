import { useState } from 'react'
import {keepPreviousData, useQuery} from "@tanstack/react-query"
import {productsListUrl} from "~/constants";

export function useProducts() {
    const [searchValue, setSearchValue] = useState('')
    const [page, setPage] = useState(1)

    const { isPending, isError, error, data, isFetching, isPlaceholderData  } = useQuery({
        queryKey: ['products', page, searchValue],
        placeholderData: keepPreviousData,
        queryFn: async () => {
            const params = new URLSearchParams({ page: String(page) })

            if (searchValue) {
                params.append('q', searchValue)
            }

            const url = `${productsListUrl}?${params.toString()}`
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`)
            }

            return await res.json();
        },
    });

    return {
        isFetching,
        isPending,
        isError,
        error,
        setSearchValue,
        setPage,
        page,
        isPlaceholderData,
        products: data?.results || [],
        searchValue,
        hasNextPage: !!data?.next,
    }
}
