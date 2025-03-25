import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const usePagination = (data: any[], itemsPerPage: number) => {
    const [searchParams, setSearchParams] = useSearchParams();


    const initialPage = Number(searchParams.get("page")) || 1;
    const [page, setPage] = useState(initialPage);

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        setSearchParams({ page: newPage.toString() });
    };

    useEffect(() => {
        const newPage = Number(searchParams.get("page")) || 1;
        if (newPage !== page) setPage(newPage);
    }, [searchParams]);

    return { currentItems, page, handlePageChange, totalPages };
};
