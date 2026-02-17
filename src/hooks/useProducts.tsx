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
            const url = searchValue ? `${productsListUrl}?page=${page}&q=${searchValue}` : productsListUrl;
            const res = await fetch(url);
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
