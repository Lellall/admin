import { useGetProductsQuery } from "../../redux/products";

interface Props {
    categoryId?: string;
    filter?: string;
    page?: number;
}
export function useProducts({ categoryId, filter, page = 0 }: Props) {
    const {
        data: products,
        isLoading,
        isFetching,
        isError,
    } = useGetProductsQuery({ page, size: 10, categoryId, filter });

    return {
        products,
        isLoading,
        isFetching,
        isError,
    };
}
