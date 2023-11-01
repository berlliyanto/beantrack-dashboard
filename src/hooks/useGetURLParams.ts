export const useGetURLParams = (search: string, selectQuery: string) : string => {
    const query = new URLSearchParams(search);
    const currentQuery = query.get(selectQuery)
    return currentQuery as string;
}