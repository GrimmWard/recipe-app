import {useSearchParams} from "react-router-dom";
import {Meal} from "../types.ts";
import {useEffect} from "react";

export const usePagination = (data: Meal[], itemsPerPage: number) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const pageFromUrl = Number(searchParams.get("page")) || 1;

    useEffect(() => {
        const maxPages = Math.ceil(data.length / itemsPerPage);
        if (pageFromUrl > maxPages) {
            setSearchParams({ page: "1" });
        } else if (pageFromUrl <= 0) {
            setSearchParams({ page: "1" });
        }
    }, [data.length, itemsPerPage, pageFromUrl, setSearchParams]);

    const startIndex = (pageFromUrl - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (newPage: number) => {
        setSearchParams({page: newPage.toString()});
    };

    return {currentItems, page: pageFromUrl, handlePageChange, totalPages};
};
